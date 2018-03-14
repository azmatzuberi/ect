import { START_YEAR } from '../../../_config/_config';
import { FormControl } from '@angular/forms';
import { StatementQueryService } from '../statement-query.service';
import { Statement } from '../../../objects/statement';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-statement',
  templateUrl: './query-statement.component.html',
  styleUrls: ['./query-statement.component.css']
})
export class QueryStatementComponent implements OnInit {
  @Input() statement: Statement;

  searchControl: FormControl;
  queryObject: Statement;
  startYear: number;

  constructor(private statementQueryService: StatementQueryService) {
    this.searchControl = this.statementQueryService.searchControl;
    this.queryObject = this.statementQueryService.queryObject;
    this.startYear = START_YEAR;

  }
  ngOnInit() {
    this.statement = new Statement({});
  }

  reset() {
    this.queryObject.politicalParty = "";
    this.queryObject.context = "";
    this.queryObject.tags = [];
    this.queryObject.year = "";
    
    this.onChange();
  }
  onChange() {
    this.statementQueryService.updateQuery();
  }
}
