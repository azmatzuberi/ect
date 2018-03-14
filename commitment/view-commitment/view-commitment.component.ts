import { CommitmentQueryService } from '../query-commitment.service';
import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Commitment } from "objects/commitment";
import { Statement } from "objects/statement";

@Component({
  selector: 'app-view-commitment',
  templateUrl: './view-commitment.component.html',
  styleUrls: ['./view-commitment.component.css']
})
export class ViewCommitmentComponent implements OnInit, OnDestroy {
  showHeader: boolean = false;
  statements: Observable<any>[] = [];
  @Input() commitment: Commitment;
  @Output('edit-complete') editComplete = new EventEmitter<any>();
  @Input() loading: boolean = false;

  messageSubscription: Subscription;

  constructor(
    private apiConnectorService: ApiConnectorService, private commitmentQueryService: CommitmentQueryService) {
    this.messageSubscription = this.commitmentQueryService.getMessage().subscribe(message => {
      console.log(message);
      if (message) {
        if (message.data == 1) {
          this.statements = [];
          this.commitment.statements.forEach(statement => {
            this.statements.push(
              this.apiConnectorService.getStatementById(statement)
            )
          });
        }
      }})
  }

  ngOnInit() {
    if (!this.commitment) {
      this.commitment = new Commitment({ 'id': "-1" });
    }

    // this.statements = this.getStatements();
  }


  updateConnectedStatements() {
    this.commitmentQueryService.updateConnectedStatements(this.commitment.id, this.commitment.statements).subscribe(data => {

    });
  }
  getStatements() {

    let query = this.apiConnectorService.convertObjectToQuery({ "id": (this.commitment.statements.length > 0) ? this.commitment.statements : ["---"] });

    return this.apiConnectorService.getStatementQuery(query, Statement.ShortProperties).map(data => {
      let temp = [];
      data.forEach(statement => {
        temp.push(new Statement(statement))
      })
      return temp;
    })

  }
  emitEditComplete() {
    this.editComplete.emit();

  }




    public ngOnDestroy(): void {
        console.log("Destroying messaging subscription in %s", "view-commitment.component.ts");
        this.messageSubscription.unsubscribe();
    }
}
