import { Router } from '@angular/router';
import { StatementQueryService } from '../statement-query.service';
import { Commitment } from '../../../objects/commitment';
import { Statement } from '../../../objects/statement';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-statement',
  templateUrl: './view-statement.component.html',
  styleUrls: ['./view-statement.component.css']
})
export class ViewStatementComponent implements OnInit {
  @Input() statement: Statement;
  @Input() commitment: Commitment = new Commitment({});
  @Input() loading: boolean = false;
  @Output('edit-complete') editComplete = new EventEmitter<any>();
  statementList = [];
  linkingVisible: boolean = false;

  constructor(private statementQueryService: StatementQueryService,
    private router: Router) {
   

  }

  updateList() {
    // this.statementList = this.commitment.statements.map(data => data["id"])
  }

  updateConnectedCommitments() {
    this.statementQueryService.updateConnectedCommitments(this.statement.id, this.statement.commitments).subscribe(data => {
      console.log("Unlinked item")
    })

  }
  viewSource(id) {
    this.router.navigate(["/sources"], {
      queryParams: {
        id: id
      }
    })

  }
  emitEditComplete() {
    this.editComplete.emit();
  }


  toggleLinking(){
    this.linkingVisible = !this.linkingVisible;
  }
  ngOnInit() {
    console.log(this.commitment);
  }

}
