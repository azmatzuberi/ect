//Imports for source-display panel component
import { UNIX_TIME_TO_DATE, DATE_TO_UNIX_TIME } from '../../../util/static-functions';
import { CSVGenerator } from '../../shared/data-export/CSVGenerator';
import { Observable } from 'rxjs/Rx';
import { QuerySourcesService } from '../query-sources.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SourceDisplayService } from './source-display.service';
import { Source } from 'objects/source';
import { Statement } from 'objects/statement';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SelectItem, MenuItem, Message } from 'primeng/primeng';
import { SourceDetailsComponent } from '../source-details-panel/source-details.component';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { MessageService, Messages } from "app/message-service/message.service";
import * as moment from 'moment';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-source-display',
  templateUrl: './source-display.component.html',
  styleUrls: ['./source-display.component.css']
})

export class SourceDisplayComponent implements OnInit, OnDestroy {

  searchControl: FormControl;
  queryObject: Source;
  truncateLength: number;
  summary: any;
  numRows = 15;
  page = 0;
  keys: string[];
  selectedParty: SelectItem[];

  currentFileUploadForm: FormData;

  @Input() miniView: boolean = false;

  constructor(private sourceDisplayService: SourceDisplayService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private querySourceService: QuerySourcesService,
    private apiConnectorService: ApiConnectorService //Importing API connector
  ) {
    this.searchControl = this.querySourceService.searchControl;
    this.queryObject = this.querySourceService.queryObject;
  }


  //Variables
  sourcesObservable: Observable<any>
  sources: Source[];
  statusCode: number;
  politicalParties: SelectItem[];
  sourceFilterTypes: SelectItem[];
  sourceFilter: string;
  cols: any[];
  dialogVisible: boolean;
  statements: Statement[];
  statementsBySource: Statement[];
  datePipe: DatePipe;
  context: string;
  initialContext: string = this.context;
  msgs: Message[];
  public subscription: Subscription;
  tableVisibility: boolean = true;
  loading: boolean = true;
  addNewSource: Source;
  addSourceDialog: boolean;
  sourceName: string;
  fileId: string;
  fileType: string;
  actualFile: any;
  sourceType: string;
  selectedType: SelectItem[];
  appointments: any[];
  rowSelect: number;
  event: any;
  dateT: Date;

  //Dialog window
  displayDialog: boolean;
  source: Source = new PrimeSource('', '', '', '', '', 0, '', '', '', '', '', '', false, '', '', '', false, false, false, '', '', null, '','','');

  selectedSource: Source;
  newSource: boolean;
  moreSources: Source[];
  dialogSource: Source;

  //Party mappings
  partyColours = [{ Liberal: 'crimson' }, { PC: 'royalblue' }, { NDP: 'orange' }, { Green: 'green' }];
  partyColoursMap: any = {};

  //Source mappings
  sourceTypes = [{ Twitter: '<i class="fa fa-twitter" aria-hidden="true"></i>' }, { Facebook: '<i class="fa fa-facebook" aria-hidden="true"></i>' },
  { 'Party Website': '<i class="fa fa-globe" aria-hidden="true"></i>' }, { Newspaper: '<i class="fa fa-newspaper-o" aria-hidden="true"></i>' },
  { Magazine: '<i class="fa fa-book" aria-hidden="true"></i>' }, { 'In-Election Newspaper': '<i class="fa fa-newspaper-o" aria-hidden="true"></i>' }
    , { Speech: '<i class="fa fa-comments" aria-hidden="true"></i>' }];

  sourceTypesMap: any = {};

  
  messageSubscription: Subscription;
  ngOnInit() {

    /*=====================================================*/
    /*Temp solution for retrieving source via params*/
    /*=====================================================*/

    this.messageSubscription = this.querySourceService.getMessage().subscribe(message => {
      if (message) {
        switch (message.data) {
          case Messages.UpdateSignal:
            this.loading = true;
            this.sourcesObservable = this.querySourceService.sources.map(data => {
              this.loading = false;
              this.summary = this.querySourceService.summary;
              this.page = 0;
              return data;
            });
            break;

        }
      }
    })


    let sourceId = this.activatedRoute.snapshot.queryParams['id'];
        // redirect for dashboard type sourece chart
    let params=this.activatedRoute.snapshot.params;
    
    if(params.type){
      this.querySourceService.queryObject.politicalParty=params.party;
      this.querySourceService.queryObject.sourceType=params.type;
    }
    
    var self = this;
    if (sourceId) {
      var getSourceSub = this.apiConnectorService.getSourceById(sourceId).subscribe(source => {

        this.source = source;
        this.sourceDisplayService.changeSource(this.source);
        //this.sourceDisplayService.getStatementsBySource(this.source.id).subscribe(statements => this.statements = statements);
        this.sourceDisplayService.getStatementsBySource(this.source.id).map(statements => {
          return statements.map(statement => new Statement(statement));
        }).subscribe(function (statements) {
          self.statements = statements;
          self.sourceDisplayService.changeStatements(self.statements);
        });
        this.compareDates(this.source);
        getSourceSub.unsubscribe();
      });

    }

    /*=====================================================*/

    this.getSources();
    this.subscription = this.sourceDisplayService.currentUpdateRow.subscribe(event => this.event = (event = this.notifyDeleteSource()));
    //Party mappings
    this.politicalParties = [];

    this.cols = [
      { field: 'publishedOn', header: 'Published Date' },
      { field: 'politcalParty', header: 'Party' },
      { field: 'sourceType', header: 'Source Type' },
      { field: 'sourceName', header: 'Source Name' },
    ]

    this.politicalParties.push({ label: 'All Parties', value: null });
    this.politicalParties.push({ label: 'Liberal', value: 'liberal' });
    this.politicalParties.push({ label: 'PC', value: 'pc' });
    this.politicalParties.push({ label: 'NDP', value: 'ndp' });
    this.politicalParties.push({ label: 'Green', value: 'green' });


    //Source Filter mappings
    this.selectedType = [
      { label: 'Select Type', value: ''},
      { label: 'Throne Speech', value: 'Throne Speech' },
      { label: 'Budget', value: 'Budget' },
      { label: 'Platform', value: 'Platform' },
      { label: 'News Media', value: 'News Media' },
      { label: 'Twitter', value: 'Twitter' },
      { label: 'Facebook', value: 'Facebook' }
    ];
    

    this.partyColours.forEach(x =>
      Object.keys(x).forEach(key => this.partyColoursMap[key] = x[key]));

    this.sourceTypes.forEach(y =>
      Object.keys(y).forEach(key => this.sourceTypesMap[key] = y[key]));

    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => this.flagSource(this.selectedSource) },
    ];

  }

  convertDate(date){
    return UNIX_TIME_TO_DATE(date);
  }

  getSources() {
    this.sourceDisplayService.getSources().map(sources => {
      return sources.map(source => new Source(source));
    }).subscribe(sources => { this.sources = sources; });
  }

  //Colours and social media icons
  setColor(x, data) {
    x.parentNode.parentNode.style.background = this.partyColoursMap[data];
  }

  setIcon(y, icons) {
    y.innerHTML = this.sourceTypesMap[icons] + " " + icons;
  }

  //Selection for datatable
  onRowSelect(event) {
    this.newSource = false;
    this.source = this.cloneSource(event.data);
    let dialogSource = this.source;
    let self = this;
    this.displayDialog = false;
    this.sourceDisplayService.changeSource(this.source);
    console.log(event);
    this.sourceDisplayService.getStatementsBySource(this.source.sourceId).map(statements => {
      return statements.map(statement => new Statement(statement));
    }).subscribe(function (statements) {
      self.statements = statements;
      self.sourceDisplayService.changeStatements(self.statements);
    });
    this.rowSelect = this.sources.findIndex(source => source.sourceId == this.source.sourceId);
    this.sourceDisplayService.setRow(this.rowSelect);
    this.sourceDisplayService.setSources(this.sources);
    console.log(this.rowSelect);
    this.compareDates(this.source);
    this.sourceDisplayService.changeDate(this.source.publishedOn);
    console.log(this.source.publishedOn);
  }

  cloneSource(s: Source): Source {
    let source = new PrimeSource('', '', '', '', '', 0, '', '', '', '', '', '', false, '', '', '', false, false, false, '', '',null,'', '', '');
    for (let prop in s) {
      source[prop] = s[prop];
    }
    return source;
  }

  // findSelectedSourceIndex(): number {
  //   console.log(this.moreSources.indexOf(this.selectedSource));
  //   return this.moreSources.indexOf(this.selectedSource);
  // }
  findSelectedSourceIndex(): number {
    return this.sources.indexOf(this.selectedSource);
  }

  compareDates(source) {
    let electionDate = new Date("May 30, 2013");
    let publishedDate = new Date(source.publishedOn);
    if (publishedDate <= electionDate) {
      this.context = "Pre-election";
    } else {
      this.context = "Post-election";
    }
    this.sourceDisplayService.changeParty(this.context);
  }

  //Context menu
  items: MenuItem[];
  flagSource(source: Source) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Source Selected', detail: source.id });
  }

  flagItem(item) {
    this.querySourceService.toggleItemFlag(item.sourceId, item.flagged).subscribe(data => {
      console.log("Source %s - Flag Toggled", item.sourceId)
    })
  }

  addSource(event) {
    this.newSource = true;
    this.addSourceDialog = true;
  }

  notifyDeleteSource() {
    this.rowSelect = this.sourceDisplayService.returnRow();
    this.sources = this.sourceDisplayService.returnSources();
    console.log(this.rowSelect);
    if (this.rowSelect) {
      this.sources.splice(this.rowSelect,1);
    }
   
    console.log("table update");
    this.tableVisibility = false;
    setTimeout(() => this.tableVisibility = true, 0);
  }

  addSourceData(source, file) {
    this.addNewSource = source;
    let convertedDate = this.saveDate(this.dateT);
    console.log("Date " + convertedDate);
    // this.addNewSource = new Source({ publishedOn: convertedDate, politicalParty: this.selectedParty, sourceName: sourceNameT, 
    //     individual: individual, sourceUrl: sourceUrlT, sourceType: this.sourceType, sourceWebLink: sourceWebLink })
    this.addNewSource.publishedOn = convertedDate;
    this.sourceDisplayService.addSource(this.addNewSource).subscribe(sourceId => {
      this.currentFileUploadForm.set("id", sourceId);
      this.apiConnectorService.uploadSourceFile(this.currentFileUploadForm);
    });

    this.addNewSource = null;
    this.addSourceDialog = false;
    this.tableVisibility = false;
    setTimeout(() => this.tableVisibility = true, 0);
  }

  cancel() {
    this.addSourceDialog = false;
  }

  switchParty() {
    console.log(this.selectedParty);
  }

  getFileDetails(event) {
    console.log(event);

    let formData = new FormData(); //Creating a new form
    let file = event.target.files[0]; //Accessing first item
    if (file) { //If file selected

      let fileName = file.name;
      let fileType = fileName.split('.').pop();
      formData.set("file", file);
      formData.set("filetype", fileType);

      this.currentFileUploadForm = formData;
    }
  }

  getBase64(file, onLoadCallBack) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = onLoadCallBack = function () {
      console.log(reader.result);
      return reader.result;
    }
  }

  exportData() {
    var dataSub: Subscription = this.querySourceService.getAllDataForExport().subscribe(data => {
      CSVGenerator.objectsToCSV(data, "Sources-" + new Date());
      dataSub.unsubscribe();
    })

  }

  public ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  dateSort(event?) {
    console.log(event);
    let comparer = function (a, b): number {
      let formatedA = moment(a.date, "MMM.DD.YYYY").format('MMM DD YYYY');
      let formatedB = moment(b.date, "MMM.DD.YYYY").format('MMM DD YYYY');
      let result: number = -1;
      if (moment(formatedB).isBefore(formatedA, 'day')) result = 1;
      return result * event.order;
    };

    this.appointments.sort(comparer);
  }

  saveDate(dateConvert) {
    console.log(dateConvert);
    return DATE_TO_UNIX_TIME(dateConvert);
  }

  
}


//Source Class Mapping
export class PrimeSource implements Source {

  constructor(public id, public sourceId, public sourceUrl, public asExportableData, public sourceName, public pageNumber,
    public lineNumber, public detail, public sourceType, public media, public publishedOn, public altImageUrl, public context,
    public valid, public setValid, public notEmpty, public politicalParty, public flagged, public deleted, public asQueryObject,
    public title, public publishedDate, public individual, public sourceWebLink, public administration) { }
}

interface FileReaderEventTarget extends EventTarget {
  result: string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;

}