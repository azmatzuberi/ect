
//import { getSourceNodes } from '@angular/cli/lib/ast-tools';
import { Http, Response } from '@angular/http';
import { CREATE_COMMITMENT, Endpoint, GET_CREATE_ITEM_URL, QUERY_DOCUMENT_LINK } from '../../../../_config/links-config';
// import { Tag } from '../objects/tag';
import { HttpService } from '../../../connection/http.service';
import { Commitment } from '../../../../objects/commitment';
import { Source } from '../../../../objects/source';
import { Statement } from '../../../../objects/statement';
import { Injectable } from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs/Rx';
import { GET_BY_PARTY_BODY, GET_BY_PARTY_URL, GET_DELETE_ITEM_URL, CONSTRUCT_QUERY_OBJECT } from "../../../../_config/links-config";

@Injectable()
export class StatementDisplayService {


  private subject = new Subject<any>();
  constructor(private http: Http) {
  }

  //-------------- READ OPERATIONS -------------------------- 

    //Real API connection
    getStatementsBySource(): Observable<Statement[]> {
      return this.http.get('http://commitmentapidev.azurewebsites.net/api/V1/Statement/GetAll')
        .map(data =>  {return this.extractData(data);})
        .catch(this.handleError);
    }

    retrieveStatements(party?) {
        let fields = ["id", "description", "politicalParty"];
        return this._retrieveItemList(Endpoint.Statement, party, fields).map(data => data as Statement[]);
    }

    _retrieveItemList(endpoint: Endpoint, party, fields: string[]) {
        let queryLink = GET_BY_PARTY_URL(party, endpoint, fields)
        return this.http.get(queryLink).map(data => JSON.parse(data["_body"]))
    }

//URL for FakeAPI - testing
// sourcesUrl = "http://localhost:3000/sources";
//Create constructor to get Http instance

//Fetch all daysofinterests
// getSources(): Observable<Source[]> {
//     return this.http.get(this.sourcesUrl)
//                .map(this.extractData)
//             .catch(this.handleError);
//             // .map((res:Response) => res.json())
//             // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
// }

    
    private extractData(res: Response) {
        let body = res.json();
        console.log(body);
        return body;
    }


    private handleError (error: Response | any) {
        console.error(error.message || error);
        console.log("error");
        return Observable.throw(error.status);
    }

}


