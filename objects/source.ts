import { UNIX_TIME_TO_DATE } from '../util/static-functions';
import { Tag } from "./tag";
import * as moment from 'moment';

export class Source {

    sourceId: string; //GUID of Source - Used in Statement - same as id
    pageNumber: number; //Used in Statement
    lineNumber: number; //Used in Statement
    detail: Detail; //The specific details of a source in relation to the Statement - Used in Statement
    title: string;
    sourceName: string; //Used in Statement / Source
    sourceType: string; //Used in Statement / Source
    sourceWebLink: string;
    individual: string;
    deleted: boolean;
    id: string; //Used in Source - same as sourceId;
    media: string;  //Used in Source
    publishedOn: Number; //Used in Source
    publishedDate: string; //Used in Source
    sourceUrl: string; //Used in Source
    altImageUrl: string; //Used in Source
    flagged: boolean;
    valid: boolean = false;
    context: string = "";
    politicalParty: string;
    // administration: string;

    constructor(options: {}) {
        this.sourceId = options['sourceId'] || options['id'] || -1;
        this.pageNumber = options['pageNumber'];
        this.lineNumber = options['lineNumber'];
        this.detail = options['detail'] || new Detail({ pageNumber: this.pageNumber, lineNumber: this.lineNumber });
        this.title = options['title'] || "";
        this.sourceName = options['sourceName'] || "";
        this.sourceWebLink = options['sourceWebLink'] || "";
        this.individual = options['individual'] || "";
        this.sourceType = options['sourceType'] || "";
        this.media = options['media'] || "";
        this.publishedOn = UNIX_TIME_TO_DATE(options["publishedOn"]) || options["date"] || new Date();
        this.publishedDate = options["publishedDate"] || "";
        this.flagged = options["flagged"] == "true";
        this.sourceUrl = options['sourceUrl'] || "";
        this.altImageUrl = options['altImageUrl'] || "";
        this.context = options['context'] || "";
        this.deleted = options["deleted"] || false;
        this.politicalParty = options['politicalParty'] || "";
        // this.administration = options['administration'] || "";
    }

    setValid(valid: boolean) {
        console.log(valid);
        this.valid = valid;
    }

    notEmpty(value: any) {
        return value.toString().trim().length > 0;
    }

    asQueryObject() {
        return {
            // publishedOn: this.publishedOn,
            politicalParty: this.politicalParty,
            sourceName: this.sourceName,
            sourceType: this.sourceType,
            context: this.context,
            publishedDate: this.publishedDate,
            // administration: this.administration,
            //    flagged: this.flagged ,//Must be added to API as string
            deleted: this.deleted  //Must be added to API as string
        }

    }

     asExportableData() {
        return {
            "Source Name": this.sourceName,
            // "Administration": this.administration,
            "Context":this.context, 
            "Political Party": this.politicalParty,
            "Type": this.sourceType,
            "URL": this.sourceUrl,
            "Publishing Date": this.publishedOn
        }
    }
}


class Detail {
    pageNumber: number;
    lineNumber: number;

    constructor(options: {} = {}) {
        this.pageNumber = options["pageNumber"] || -1;
        this.lineNumber = options["lineNumber"] || -1;
    }
}
