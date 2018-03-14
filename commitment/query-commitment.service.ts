import { Messenger } from '../shared/messenger/Messenger';
import { Statement } from '../../objects/statement';
import { FormControl } from '@angular/forms';
import { ApiConnectorService } from '../_app-services/api-connector.service';
import { Commitment } from '../../objects/commitment';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Messages } from "app/message-service/message.service";

@Injectable()
export class CommitmentQueryService extends Messenger{
  commitments: Observable<any>;
  queryObject: Commitment;
  searchControl = new FormControl();
  searchDebounce: number = 500;

  summary: any = {};


  searchConfiguration(debounce: number) {
    this.searchControl.valueChanges.debounceTime(debounce).subscribe(value => {
      this.updateQuery();
    })
  }

  updateQuery() {
    this.commitments = this.queryCommitments();
    this.sendMessage(Messages.UpdateSignal); //Update query
  }

  constructor(
    private apiConnectorService: ApiConnectorService,
  ) {
    super();
    this.queryObject = new Commitment({});
    this.searchConfiguration(this.searchDebounce);
    // this.commitments = this.getAllCommitments();
  }


  queryCommitments() {
    var query = this.prepareQuery()
    return this.apiConnectorService.getCommitmentQuery(query, Commitment.ShortProperties).map(data => {
      this.summary = {
        query: query,
        resultCount: data.length,
        queryAsString: this.createQueryString(query)
      }
      return this.convertCommitments(data);
    });
  }

  getAllDataForExport() {
    var query = this.prepareQuery()
    return this.apiConnectorService.getCommitmentQuery(query, Commitment.AllProperties).map(data => {
      var commitments = this.convertCommitments(data);
      return <any[]>commitments.map(commitment => <Commitment>commitment.asExportableData());
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


  getAllCommitments() {
    return this.apiConnectorService.retrieveAllCommitments().map(data => {
      return this.convertCommitments(data);
    });
  }

  convertCommitments(data) {
    let tempList = [];
    data.forEach(commitment => {
      tempList.push(Commitment.fromAPIForm(commitment))
    })
    return tempList;
  }

  toggleItemFlag(id: string, value: boolean) {
    var updating = {
      "flagged": value + ""
    }
    return this.apiConnectorService.updateFieldsCommitment(id, updating);
  }

  updateConnectedStatements(id: string, items: any[]) {
    var updating = {
      "statements": JSON.stringify(Commitment.stringsToStatementObjects(items))
    }

    return this.apiConnectorService.updateFieldsCommitment(id, updating);


  }
}







