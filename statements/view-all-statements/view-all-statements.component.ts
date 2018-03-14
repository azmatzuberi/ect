import { CSVGenerator } from '../../shared/data-export/CSVGenerator';
import { Commitment } from '../../../objects/commitment';
import { FormControl } from '@angular/forms';
import { StatementQueryService } from '../statement-query.service';
import { Statement } from '../../../objects/statement';
import { Observable, Subscription } from 'rxjs/Rx';
import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { UNIX_TIME_TO_DATE } from "util/static-functions";
import { MessageService, Messages } from "app/message-service/message.service";

@Component({
  selector: 'app-view-all-statements',
  templateUrl: './view-all-statements.component.html',
  styleUrls: ['./view-all-statements.component.css']
})
export class ViewAllStatementsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() statements: Observable<any>;
  @Input() miniView: boolean = false;
  loading: boolean = true;
  @Output() itemSelected = new EventEmitter<any>();
  @Input() selectedStatements: string[] = [];
  @Output() selectedStatementsChange = new EventEmitter<any>();

  currentParty: string;
  searchControl: FormControl;
  queryObject: Statement;
  @Input() commitment: Commitment = new Commitment({});
  truncateLength: number;
  summary: any;
  numRows = 10;
  page = 0;

  messageServiceSubscription: Subscription;
  constructor(private apiConnectorServices: ApiConnectorService,
    private statementQueryService: StatementQueryService) {
    this.searchControl = this.statementQueryService.searchControl;
    this.queryObject = this.statementQueryService.queryObject;


  }

  ngOnInit() {
    this.statements = this.statementQueryService.statements;
    this.truncateLength = 100;

    this.messageServiceSubscription = this.statementQueryService.getMessage().subscribe(message => {
      if (message) {
        var messageType = message.data;
        switch (messageType) {
          case Messages.UpdateSignal:
            this.loading = true;
            this.statements = this.statementQueryService.statements.map(data => {
              this.loading = false;
              this.summary = this.statementQueryService.summary;
              this.page = 0;
              return data;
            });
            break;
          case Messages.Completed:
            this.loading = false;
            break;
        }
        this.statementQueryService.clearMessage();
      }
    })

  }

  //Emits when a statement checkbox is checked / unchecked
  onChangeSelectedStatements() {
    this.selectedStatementsChange.emit(this.selectedStatements);
    this.commitment.statements = this.selectedStatements;
  }

  selectItem(item) {
    // let commitment = Commitment.fromAPIForm(item);
    this.itemSelected.emit(item.data);
    this.updateSelection(item);
  }

  convertTime(time) {
    return UNIX_TIME_TO_DATE(time);
  }
  updateSelection(event) {
    this.commitment.statements = this.selectedStatements.map(statement => statement["id"])
    if (this.commitment.statements.length == 1 && this.currentParty !== event.data.politicalParty) {
      this.queryObject.politicalParty = event.data.politicalParty;
      this.currentParty = event.data.politicalParty;
      this.statementQueryService.updateQuery();
    } else if (this.commitment.statements.length == 0) {
      this.currentParty = "";
      this.queryObject.politicalParty = "";
      this.statementQueryService.updateQuery();
    }


  }

  unselectItem(event) {
    // this.commitment.statements = this.selectedStatements.map(statement => statement["id"])
    this.updateSelection(event);
  }

  exportData() {
    var dataSub: Subscription = this.statementQueryService.getAllDataForExport().subscribe(data => {
      CSVGenerator.objectsToCSV(data, "Statements-" + new Date());
      dataSub.unsubscribe();
    })

  }


  flagItem(item) {
    this.statementQueryService.toggleItemFlag(item.id, item.flagged).subscribe(data => {
      console.log("Statement %s - Flag Toggled", item.id)
    })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Not implemented yet.');
  }

  public ngOnDestroy(): void {
    this.messageServiceSubscription.unsubscribe();
    console.warn("Destroying subscriptions in %s", "view-all-statements.component.ts")
  }
}
