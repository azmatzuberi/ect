import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { Statement } from '../../../objects/statement';
import { Component, Input, OnInit } from '@angular/core';
import { UNIX_TIME_TO_DATE } from "util/static-functions";
import { Commitment } from "objects/commitment";
import { CommitmentQueryService } from "app/commitment/query-commitment.service";
import { StatementQueryService } from "app/statements/statement-query.service";

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.css']
})
export class StatementsComponent implements OnInit {
  statement: Statement = new Statement({});
  statementList: string[];
  commitment: Commitment = new Commitment({});
  statementObservable: Observable<any>;
  loadingData: boolean = false;

  constructor(private statementQueryService: StatementQueryService,
    private apiConnectorService: ApiConnectorService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.statement = new Statement({ 'id': "-1" })

  }

  ngOnInit() {
    var id = this.activatedRoute.snapshot.queryParams['id'];
    if (id) {
      this.setItem(id);
      this.commitment.statements.push(id);
    }
  }

  setStatementText(textObject) {
    this.statement.description = textObject.text;

  }

  setSelected(item) {
    this.statement = item;


    this.location.go(this.router.url.split("?")[0], "id=" + item.id);
    this.setItem(item.id);


  }

  setItem(id) {
    this.loadingData = true;
    this.statementObservable = this.apiConnectorService.getStatementById(id).map(data => {
      console.log(data);
      this.loadingData = false;
      return data[0] ? new Statement(data[0]) : new Statement({id:"-1"})
    });
  }


  setSelectedStatements(statements) {
    console.log(statements);
    this.statementList = statements;
  }

  refreshStatements() {
    this.statementQueryService.updateQuery()
  }
}
