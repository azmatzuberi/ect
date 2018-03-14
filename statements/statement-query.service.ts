import { Messenger } from '../shared/messenger/Messenger';
import { Messages } from '../message-service/message.service';

import { ApiConnectorService } from '../_app-services/api-connector.service';
import { FormControl } from '@angular/forms';
import { Statement } from '../../objects/statement';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StatementQueryService extends Messenger {
  statements: Observable<any>;
  queryObject: Statement;
  searchControl = new FormControl();
  searchDebounce: number = 500;
  summary: any = {};
  bool: boolean;
  public closeDialog = new BehaviorSubject<any>(null);
  currentCloseDialog = this.closeDialog.asObservable();

  searchConfiguration(debounce: number) {
    this.searchControl.valueChanges.debounceTime(debounce).subscribe(value => {
      this.updateQuery();
    })
  }

  updateQuery() {
    this.statements = this.queryStatements();
    this.sendMessage(Messages.UpdateSignal);
  }

  constructor(private apiConnectorService: ApiConnectorService) {
    super();
    this.queryObject = new Statement({});
    this.searchConfiguration(this.searchDebounce);
    // this.statements = this.getAllStatements();
  }


  queryStatements() {
    var query = this.prepareQuery();
    return this.apiConnectorService.getStatementQuery(query, Statement.ShortProperties).map(data => {
      return this.convertAPIDataToStatements(data);
    }).map(data => {
      this.summary = {
        query: query,
        resultCount: data.length,
        queryAsString: this.createQueryString(query)
      }
      return data;
    });
  }

  getAllDataForExport() {
    var query = this.prepareQuery();
    return this.apiConnectorService.getStatementQuery(query, Statement.AllProperties).map(data => {
      var statements = this.convertAPIDataToStatements(data);
      return <any[]>statements.map(statement => <Statement>statement.asExportableData())
    });
  }


  createQueryString(query) {
    var filters = [];
    Object.keys(query).forEach(key => {
      var values = query[key].Values;
      if (values.length > 0) {
        values.forEach(value => {
          if (value != "")
            filters.push(JSON.stringify(value));
        })
      }
    })
    return filters.join(", ");
  }

  prepareQuery() {
    return this.apiConnectorService.convertObjectToQuery(this.queryObject.asQueryObject());
  }


  getAllStatements() {
    return this.apiConnectorService.retrieveAllStatements().map(data => {
      return this.convertAPIDataToStatements(data);
    });
  }

  convertAPIDataToStatements(data) {
    var tempStatements = [];
    data.forEach(statement => {
      tempStatements.push(new Statement(statement));
    });
    return tempStatements;
  }

  toggleItemFlag(id: string, value: boolean) {
    var updating = {
      "flagged": value + ""
    }
    return this.apiConnectorService.updateFieldsStatement(id, updating);
  }

  updateConnectedCommitments(id: string, commitments: string[]) {
    var updating = {
      "commitments": JSON.stringify(Statement.stringsToCommitmentObjects(commitments))
    }
    return this.apiConnectorService.updateFieldsStatement(id, updating);
  }

  closeDialogFunction() {
    this.closeDialog.next(null);
    console.log();
  }

}
