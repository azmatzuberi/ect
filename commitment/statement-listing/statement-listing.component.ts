import { Observable } from 'rxjs/Rx';
import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Statement } from "objects/statement";

@Component({
  selector: 'app-statement-listing',
  templateUrl: './statement-listing.component.html',
  styleUrls: ['./statement-listing.component.css']
})
export class StatementListingComponent implements OnInit, OnChanges {
  @Input() showSearch: boolean = true;
  @Input() statements: string[]; //List of Statement ids
  @Output() statementsChange = new EventEmitter<any>();
  @Output() unlinkStatement = new EventEmitter<any>();

  @ViewChild('statementFilter') statementFilter: any;
  truncateLength: number = 50;
  statementsObservable: Observable<any>;
  loading: boolean = true; //Used to indicate if loading is in progress


  constructor(private apiConnectorService: ApiConnectorService) {
    this.statements = [];

  }

  ngOnInit() { }

  unlink(statement) {

    //Removes selected item
    this.statements = this.statements.filter(statementId => statementId != statement.id);
    this.statementsChange.emit(this.statements);
  }

  onChange() {
    this.statementsChange.emit(this.statements);
  }


  public ngOnChanges(changes: SimpleChanges): void {
    if (this.statements && this.statements.length > 0) { //Checking for statements
      this.loading = true; //Data load in progress
      this.statements.forEach((statement, index) => {
        if (index == 0) { //If first item
          this.statementsObservable = this.apiConnectorService.getStatementById(statement) //Passing in statementId 
            .map(data => {

              //If last item: loading complete
              this.loading = !(this.statements.length - 1 == index);

              //Converting all elements to Statement objects
              return data.map(statement => new Statement(statement));
            });

        } else {
          this.statementsObservable = this.statementsObservable.mergeMap(data => { //Merge map to combine the data from the Observables
            return this.apiConnectorService.getStatementById(statement).map(innerData => {

              //If last item: loading complete
              this.loading = !(this.statements.length - 1 == index);

              //Combining the data from the first Observable with the current Observable
              return data.concat(innerData.map(statement => new Statement(statement)));
            });
          })
        }

      });
    } else { //If there are no statements 
      this.statementsObservable = null; //Emptying Observable
      this.loading = false; //Stop loading status
    }


  }
}
