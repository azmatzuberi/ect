import { Messenger, Messages } from '../shared/messenger/Messenger';
import { ApiConnectorService } from '../_app-services/api-connector.service';
import { FormControl } from '@angular/forms';
import { Source } from '../../objects/source';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class QuerySourcesService extends Messenger {
  sources: Observable<any>;
  queryObject: Source;
  searchControl = new FormControl();
  searchDebounce: number = 500;
  summary: any;


  constructor(private apiConnectorService: ApiConnectorService) {
    super()
    this.queryObject = new Source({
    });
    this.searchConfiguration(this.searchDebounce);

  }

  searchConfiguration(debounce: number) {
    this.searchControl.valueChanges.debounceTime(debounce).subscribe(value => {

      this.updateQuery();
    })
  }

  updateQuery() {
    this.sources = this.querySources();
    this.sendMessage(Messages.UpdateSignal)


  }

  querySources() {
    var query = this.prepareQuery();
    return this.apiConnectorService.getSourceQuery(query).map(data => {
      return this.convertAPIDataToSources(data);
    }).map(data => {
      // this.messageService.sendMessage(Messages.Completed); 
      this.summary = {
        query: query,
        resultCount: data.length,
        queryAsString: this.createQueryString(query)
      }
      return data;
    });
   
  }

  prepareQuery() {
    return this.apiConnectorService.convertObjectToQuery(this.queryObject.asQueryObject())
  }


  //Function for preparing data for export
  getAllDataForExport() {
    var query = this.prepareQuery();
    return this.apiConnectorService.getSourceQuery(query).map(data => {
      var sources = this.convertSources(data);
      return <any[]>sources.map(source => <Source>source.asExportableData());
    })
  }

  //Converts a list into a list of generic objects into source objects
  convertSources(data) {
    let tempList = [];
    data.forEach(commitment => {
      tempList.push(new Source(data));
    })
    return tempList;
  }

  convertAPIDataToSources(data) {
    var tempSources = [];
    data.forEach(source => {
      tempSources.push(new Source(source));
    });
    return tempSources;
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

  toggleItemFlag(id: string, value: boolean) {
    var updating = {
      "flagged": value + ""
    }
    return this.apiConnectorService.updateFieldsSource(id, updating);
  }

}
