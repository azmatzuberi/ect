import { CSVGenerator } from '../../shared/data-export/CSVGenerator';
import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { EventEmitter } from '@angular/core';
// import { getSourceNodes } from '@angular/cli/lib/ast-tools';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CREATE_COMMITMENT, Endpoint, GET_CREATE_ITEM_URL, QUERY_DOCUMENT_LINK } from '_config/links-config';
// import { Tag } from '../objects/tag';
import { HttpService } from 'app/connection/http.service';
import { Commitment } from 'objects/commitment';
import { Source } from 'objects/source';
import { Statement } from 'objects/statement';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { GET_BY_PARTY_BODY, GET_BY_PARTY_URL, GET_DELETE_ITEM_URL, CONSTRUCT_QUERY_OBJECT } from "_config/links-config";
import { FormControl } from '@angular/forms';
import { MessageService } from "app/message-service/message.service";
import { Messages } from '../../message-service/message.service';
import { environment } from '../../../environments/environment';
import { Subscription } from "rxjs/Subscription";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SourceDisplayService {

    queryObject: Statement;
    searchControl = new FormControl();
    statements: Statement[];
    source: Source;
    sourcesRow: Source[];
    context: string;
    date: string;
    deleteRowSubject: any;
    party: string;
    row: number;
    public sources: any;
    public statementsUpdate = new BehaviorSubject<Statement[]>(this.statements);
    public sourceUpdate = new BehaviorSubject<Source>(this.source);
    public sourceIdUpdate = new BehaviorSubject<any>(this.source);
    public partyUpdate = new BehaviorSubject<any>(this.party);
    public dateUpdate = new BehaviorSubject<any>(this.date);
    public updateRow = new BehaviorSubject<any>(null);
    public sourceSUpdate = new BehaviorSubject<Source[]>(this.sources);
    currentSourceId = this.sourceIdUpdate.asObservable();
    updateUrl = environment.apiEndPoint + 'V1/Source/UpdateSource';
    currentSource = this.sourceUpdate.asObservable();
    currentStatements = this.statementsUpdate.asObservable();
    currentParty = this.partyUpdate.asObservable();
    currentDate = this.dateUpdate.asObservable();
    currentSources = this.sourceSUpdate.asObservable();
    currentUpdateRow = this.updateRow.asObservable();
    sourceObject: Source;
    summary: any = {};
    searchDebounce: number = 500;

    constructor(private http: Http, private apiConnectorService: ApiConnectorService) {
        this.queryObject = new Statement({});
        // this.searchConfiguration(this.searchDebounce);
        this.sources = this.getAllStatements();
    }

    //Real API connection
    getSources(): Observable<Source[]> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let queryString = '[{"Name": "deleted","Values": ["false"]}';
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(environment.apiEndPoint + 'V1/Source/QueryDocument', queryString, options)
            .map(data => { return this.extractData(data); })
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(body);
        return body;
    }

    private handleError(error: Response | any) {
        console.error(error.message || error);
        console.log("error");
        return Observable.throw(error.status);
    }

    //-------------- UPDATE OPERATIONS --------------------------// 

    //Update source
    updateSource(source: Source): Observable<Source> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        let updateString = '{"Id": "' + source.sourceId + '", "Detail" : [{ "Name" : "publishedOn", "Value": "' + source.publishedOn +
            '" }, { "Name" : "sourceType", "Value": "' + source.sourceType + '" }, { "Name" : "politicalParty", "Value": "' +
            source.politicalParty + '" }, { "Name" : "sourceUrl", "Value": "' + source.sourceUrl + '" }, { "Name" : "sourceName", "Value": "' +
            source.sourceName + '" }, { "Name" : "sourceWebLink", "Value": "' + source.sourceWebLink + '" },' +
            '{"Name" : "individual", "Value": "' + source.individual + '}]}';
        return this.http.post(this.updateUrl, updateString, options)
            // .map(success => success.status)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Sending object to source details
    changeSource(source) {
        this.sourceUpdate.next(source);
        console.log(source);
    }

    //Sending object to source details
    changeDate(date) {
        this.dateUpdate.next(date);
        console.log(date);
    }

    //Statements update
    getAllStatements(): Observable<Statement[]> {
        return this.http.get(environment.apiEndPoint + 'V1/Statement/GetAll')
            .map(data => { return this.extractData(data); })
            .catch(this.handleError);
    }

    getStatementsBySource(sourceId?: string): Observable<Statement[]> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        // let cpParams = new URLSearchParams();
        let queryString = '[{"Name": "source.sourceId","Values": ["' + sourceId + '"]},{"Name": "deleted", "Values": ["false"]}]';
        console.log(sourceId);
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(environment.apiEndPoint + 'V1/Statement/QueryDocument', queryString, options)
            .map(data => { return this.extractData(data); }, (statements => {
                return statements.map(statement => new Statement(statement));
            }))
            .catch(this.handleError);
    }

    //Update statement source
    changeSourceId(source) {
        this.sourceIdUpdate.next(source.id);
        console.log(source.id);
    }

    changeStatements(statements) {
        this.statementsUpdate.next(statements);
        console.log(statements);
    }

    changeParty(party) {
        this.partyUpdate.next(party);
        console.log(party);
    }

    changeSources(sources) {
        this.sourceSUpdate.next(sources);
        console.log(sources);
    }

    updateRows() {
        this.updateRow.next(null);
        console.log();
    }

    unlinkStatement(statement): Observable<Statement> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(statement.id);
        let url = environment.apiEndPoint + "V1/Statement/Delete?id=" + statement.id + "&hardDelete=false";
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    deleteSource(source): Observable<Source> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let url = environment.apiEndPoint + "V1/Source/Delete?id=" + source.id + "&hardDelete=false";
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(source.id);
        return this.http.delete(url, options)
            .map(res => this.getSources())
            .catch(this.handleError);
    }

   
    toggleItemFlag(id: string, value: boolean) {
        var updating = {
            "flagged": value + ""
        }
        return this.apiConnectorService.updateFieldsSource(id, updating);
    }

    addSource(source) {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log("sourceDate " + source.publishedOn);
        let createUrl = environment.apiEndPoint + 'V1/Source/CreateSource';
        let updateString = '{"publishedOn": "' + source.publishedOn + '", "politicalParty" : "' + source.politicalParty +
            '", "sourceName" : "' + source.sourceName + '", "sourceUrl" : "' + source.sourceUrl + '", "sourceType" : "' + source.sourceType + '",' +
            '"sourceWebLink" : "' + source.sourceWebLink + '", "individual" : "' + source.individual + '"}';
        return this.http.post(createUrl, updateString, options)
            // .map(success => success.status)
            .map(this.extractData)
            .catch(this.handleError)
    }

    uploadFile(fileType, id, actualFile) {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        let objJsonB64 = actualFile;
        console.log("Base: " + actualFile);
        let uploadString = '[{"file" : "' + objJsonB64 + '"}, {"id" : "' + id + '"}, {"fileType" : "' + fileType + '"}]';
        let uploadUrl = environment.apiEndPoint + 'V1/Source/UploadFile';
        return this.http.post(uploadUrl, uploadString, options)
            // .map(success => success.status)
            .map(this.extractData)
            .catch(this.handleError).subscribe(data => {
            });
    }

    setRow(row) {
        this.row = row;
        console.log("set " + this.row);
    }

    setSources(sources) {
        this.sourcesRow = sources
    }

    returnRow() {
        console.log("return " + this.row);
        return this.row;
    }

    returnSources() {
        return this.sourcesRow;
    }
  
}