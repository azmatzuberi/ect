// Imports for source-details component
import { UNIX_TIME_TO_DATE, DATE_TO_UNIX_TIME } from '../../../util/static-functions';
import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SourceDisplayService } from 'app/sources/source-display/source-display.service';
import { Source } from '../../../objects/source';
import { Statement } from '../../../objects/statement';
import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { PrimeSource, SourceDisplayComponent } from 'app/sources/source-display/source-display.component'
import { Subscription } from 'rxjs/Subscription';
import { SelectItem, OverlayPanel } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import { AppControlService } from '../../app-control.service';
import * as moment from 'moment'; 
import { QuerySourcesService } from 'app/sources/query-sources.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-source-details-panel',
  templateUrl: './source-details.component.html',
  styleUrls: ['./source-details.component.css'],
})
export class SourceDetailsComponent implements OnInit, OnDestroy {
  @Output() done = new EventEmitter<any>();

  constructor(public sourceDisplayService: SourceDisplayService,
    private datePipe: DatePipe, private router: Router, 
    private activatedRoute: ActivatedRoute,
    private apiConnectorService: ApiConnectorService,
    private appControlService: AppControlService,
    private querySourcesService: QuerySourcesService,
    private confirmationService: ConfirmationService) {
  }


  //Dialog window
  displayDialog: boolean;
  source: Source;
  statement: Statement;
  statements: Statement[];
  originalSource: any;
  selectedSource: Source;
  selectedParty: string;
  newSource: boolean;
  moreSources: Source[];
  dialogSource: Source;
  displayDescription: boolean;
  sourceTypeN: string;
  selectedType: SelectItem[];
  selectedValue: string;
  currentFileUploadForm: FormData;

  //Display description
  selectedStatement: Statement;
  newStatement: boolean;
  overlay: boolean;

  //Other
  politicalParties: SelectItem[];
  public sources: Source[];
  public subscription: Subscription;
  public statementSubscribe: Subscription;
  public partySubscribe: Subscription;
  public sourceDateSub: Subscription;
  statusCode: number;
  sourceId: string;
  electionDate: Date;
  context: string;
  publishedDate: Date;
  public statementOutput: string;
  statementVisibility: boolean = true;
  delRow: number;
  numRows: number;
  pDate: string;
  pDate2: number;
  unixTime: number;
  sourceVisibility: boolean;


  ngOnInit() {
    this.sourceDisplayService.getSources().subscribe(sources => { this.sources = sources; });

    //Get the source from the source display panel
    this.subscription = this.sourceDisplayService.currentSource.subscribe(source => this.source = source);
    this.statementSubscribe = this.sourceDisplayService.currentStatements.subscribe(statements => this.statements = statements);
    this.partySubscribe = this.sourceDisplayService.currentParty.subscribe(party => this.updateSourceVisibility())
    this.sourceDateSub = this.sourceDisplayService.currentDate.subscribe(pDate => this.pDate = (pDate = moment(pDate).format("MMM DD, YYYY")));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.statementSubscribe.unsubscribe();
    // this.contextSubscribe.unsubscribe();
  }

  //Selection of statement for datatable
  onRowSelect(event) {
    this.newStatement = false;
    this.statement = this.cloneStatement(event.data);
    this.displayDescription = true;
  }

  //Overlay
  selectOverlay(event, statement: Statement, overlaypanel: OverlayPanel) {
    this.selectedStatement = statement;
    overlaypanel.toggle(event);
  }

  //Editing the source details
  onSourceEdit(source) {
    this.newSource = false;
    let dialogSource = this.cloneSource(source.data);
    let selectedParty = this.source.politicalParty;
    // this.source.publishedOn = moment(this.pDate).unix();    
    this.displayDialog = true;
    this.pDate;
  }


  //Clone source prior to editing
  cloneSource(source: Source): Source {
    let s = source;
    for (let prop in s) {
      s[prop] = source[prop];
    }
    return source;
  }

  convertDate(date){
    return UNIX_TIME_TO_DATE(date)
  }

  saveDate(date) {
    console.log(date);
    return this.unixTime = DATE_TO_UNIX_TIME(date)
  }

  //Clone statement to view
  cloneStatement(statement: Statement): Statement {
    let s = statement;
    for (let prop in s) {
      s[prop] = statement[prop];
    }
    return statement;
  }

  //Saving method for updating details
  save(event) {
    let sources = this.sources;
    let sourceId = this.source.id;
    this.source.publishedOn = this.saveDate(this.pDate);
    this.pDate2 = this.saveDate(this.pDate);
    console.log("moment: " + this.source.publishedOn);
    this.sourceDisplayService.updateSource(this.source)
      .subscribe(successCode => {
        this.source = successCode;
      })
    this.pDate =  moment(this.convertDate(this.pDate2)).format("MMM DD, YYYY");
    this.sources = sources;
    this.displayDialog = false;
    this.sourceDisplayService.updateRows();
  }
  

  //Spare method, not used
  findSelectedSourceId(): string {
    return this.source.id;
  }

  //Unlink statement
  unlinkStatement(row) {
    this.delRow = this.statements.indexOf(row);
    console.log(this.delRow);
    this.statement = null;
    this.statements.splice(this.delRow,1);
    this.numRows = this.statements.length;
    this.sourceDisplayService.unlinkStatement(row).subscribe(typeData => console.log(typeData));
    // this.displayDescription = false;
    this.updateVisibility()
  }

  //Delete source
  deleteSource(event) {
    let sourceObj = this.source;
    this.sourceDisplayService.deleteSource(this.source).subscribe(successCode => {
      this.source = successCode;
    });
    this.sourceDisplayService.getSources().subscribe(sources => { this.sources = sources; });
    this.sourceDisplayService.changeSources(this.sources);
    this.displayDialog = false;
    this.sourceDisplayService.updateRows();
    this.router.navigateByUrl('statements').then(() => {
    setTimeout(() => this.router.navigateByUrl('sources'), 0);
    })
    this.apiConnectorService.deleteSource(this.source.sourceId).subscribe(data => {
      this.appControlService.newGrowlMessage({
        severity: 'info',
        summary: 'Deleted',
        detail: "Source has been deleted"
      })
      console.log("Source %s has been soft deleted", this.source.sourceId);
      this.done.emit();
    }, (error => {
      console.warn("Could not delete source %s", this.source.sourceId);
    }))
  }
  
  updateVisibility(): void {
    console.log("statement update");
    this.statementVisibility = false;
    setTimeout(() => this.statementVisibility = true, 0);
  }

  updateSourceVisibility(): void {
    console.log("source update");
    this.sourceVisibility = false;
    setTimeout(() => this.sourceVisibility = true, 0);
  }
  
  onChange() {
    this.querySourcesService.updateQuery();
  }

  cancel() {
    this.displayDialog = false;
  }

  confirmDelete(row) {
    this.confirmationService.confirm({
      message: 'Do you want to unlink this statement?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.unlinkStatement(row);
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

  confirmDeleteSource(row) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this source?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.deleteSource(row);
        this.pDate = "";
        this.source.context = null;
        this.source.sourceName = null;
        this.source.sourceType = null;
        this.source.politicalParty = null;
        this.source.sourceUrl = null;
        this.statements = null;
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
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
}

