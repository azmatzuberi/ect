import { DATE_TO_UNIX_TIME, UNIX_TIME_TO_DATE } from '../util/static-functions';
import { Tag } from './tag';
import { Ministry } from "objects/ministry";

export class Commitment {
    text: string = "";
    party: string = "";
    context: string = "";
    administration: string = "";
    date: Date = new Date();
    tags: string[] = [];
    ministries: string[] = [];
    leadMinistries: string[] = [];
    supportingMinistries: string [] = [];
    sectors: string[] = [];
    id: string = "";
    announcementDate: Date = new Date();
    statements: string[] = [];
    deleted: boolean = false;
    flagged: boolean = false;
    created: Date = new Date();
    createdFormated: string;
    year: string = "";

               
    constructor(options: {}) {
        Object.keys(this).forEach(key => {
            try {
                this[this.getSetterName(key)](options[key]);
            } catch (e) {
                console.error("No setter for '%s'", key)
            }
        });
    }

    getSetterName(fieldName) {
        return "set" + fieldName[0].toUpperCase() + fieldName.substring(1, fieldName.length);
    }

    setFlagged(flagged) {
        this.flagged = (flagged == "true");
    }
    
    setLeadMinistries(ministries){
        this.leadMinistries = ministries || [];
    }

    setSupportingMinistries(ministries){
        this.supportingMinistries = ministries || [];
    }
    setDeleted(deleted) {
        this.deleted = deleted || false;
    }
    setId(id) {
        this.id = id || "";
    }
    setText(text) {
        this.text = text || "";
    }

    setParty(party) {
        this.party = party || "";
    }

    setContext(context) {
        this.context = context || "";
    }

    setAdministration(administration) {
        this.administration = administration || "";
    }

    setDate(date) {
        this.date = date || new Date();
    }

    setAnnouncementDate(announcementDate){
        this.announcementDate = announcementDate || new Date();
    }
    setMinistries(ministries) {
        this.ministries = ministries || [];
    }
    setTags(tags) {
        this.tags = tags || [];
    }

    setSectors(sectors) {
        this.sectors = sectors;
    }

    setStatements(statements) {
        this.statements = statements || [];
    }

    setCreatedFormated(createdFormated){
        this.createdFormated = createdFormated || "";
    }

    setCreated(created){
        this.created = created || new Date();
    }

    setYear(year){
        // this.year = year;
    }

    //===========================================================================
    //The following functions are used to prepare a Commitment object for the API
    //===========================================================================

    _stringsToTagObjects(tags) {
        let tagObjects = [];
        tags.forEach(tag => {
            tagObjects.push(new Tag({ "tag": tag }))
        });
        return tagObjects;
    }

    _TagObjectsToStrings(tags) {
        try {
            let tagStrings = [];
            tags.forEach(tag => {
                tagStrings.push(tag.tag);
            });
            return tagStrings;

        } catch (e) {
            console.error("Unable to convert to list of tags")
        }
    }

    _stringsToMinistryObjects(ministries, role) {
        let objects = [];
        ministries.forEach(ministry => {
            objects.push(new Ministry({ "ministryName": ministry, "role": role}))
        });
        return objects;
    }

    _ministryObjectsToString(ministries) {
        let lists = {
            lead: [],
            supporting: []
        }
        ministries.forEach(ministry => {
            ministries[ministry.role].push(ministry.ministryName);
        });
        return lists;
    }


    _stringsToStatementObjects(statements) {
        let objects = [];
        statements.forEach(statement => {
            objects.push({ "id": statement })
        });
        return objects;
    }

    _statementObjectsToString(statements) {
        let strings = [];
        statements.forEach(statement => {
            strings.push(statement.id);
        });
        return strings;
    }

    //Call this function to convert "this" into an API ready object 
    asJSONforAPI(update?: boolean) {
        let item = {
            "politicalParty": this.party,
            "flagged": this.flagged,
            "description": this.text,
            "context": this.context,
            "ministries": this._stringsToMinistryObjects(this.leadMinistries, "lead").concat(this._stringsToMinistryObjects(this.supportingMinistries, "supporting")),
            "tags": this._stringsToTagObjects(this.tags),
            "administration": this.administration,
            // "created": DATE_TO_UNIX_TIME(this.date),
            "statements": this._stringsToStatementObjects(this.statements), 
            "announcementDate": DATE_TO_UNIX_TIME(this.announcementDate),
            "created": DATE_TO_UNIX_TIME(this.created)

        }

        if (update) {
            item["id"] = this.id;
        }

        return item;

    }

    asExportableData() {
        return {
            "Created": this.date,
            "Context": this.context,
            "Party": this.party,
            "Administration": this.administration,
            "Commitment": this.text,
            "Tags": this.tags,
            "Lead Ministries": this.leadMinistries,
            "Supporting Ministries": this.supportingMinistries,
            "Number of Statements": this.statements.length
        }
    }

    static ShortProperties = [
        "created",
        "politicalParty",
        "description",
        "flagged",
        "id"
    ]

    static AllProperties = [
        "id",
        "politicalParty",
        "description",
        "administration",
        "deleted",
        "flagged",
        "context",
        "ministries",
        "tags",
        "statements",
        "created"
    ]


    asQueryObject() {
        return {
            "politicalParty": this.party,
            "deleted": this.deleted,
            "description": this.text,
            "context": this.context,
            "createdFormated": this.year,
            "tags.tag": this.tags,
            "ministries.ministryName": this.ministries,
        }

    }

    createFromAPIForm(apiCommitment) {

        this.text = apiCommitment.description;
        this.administration = apiCommitment.administration;
        this.party = apiCommitment.politicalParty;
        this.context = apiCommitment.context;
        // this.administration = apiCommitment.administration;

        var lists = this._ministryObjectsToString(apiCommitment.ministries);
        this.leadMinistries = lists.lead;
        this.supportingMinistries = lists.supporting;
        this.ministries = lists.lead.concat(lists.supporting);
        
        this.tags = this._TagObjectsToStrings(apiCommitment.tags);
        this.date = UNIX_TIME_TO_DATE(apiCommitment.created);
        this.flagged = (apiCommitment.flagged == "true");
        this.statements = this._statementObjectsToString(apiCommitment.statements || []);
        this.announcementDate = UNIX_TIME_TO_DATE(this.announcementDate); 
        this.created = UNIX_TIME_TO_DATE(this.created); 
    }

    //=================STATIC FUNCTIONS============================

    static fromAPIForm(apiCommitment) {

        //  console.log(apiCommitment["statement"]);

        let commitment = new Commitment({
            text: apiCommitment.description,
            party: apiCommitment.politicalParty,
            administration: apiCommitment.administration,
            context: apiCommitment.context,
            ministries: Commitment.ministryObjectsToString(apiCommitment.ministries || []),
            tags: Commitment.tagObjectsToStrings(apiCommitment.tags || []),
            date: UNIX_TIME_TO_DATE(apiCommitment.created),
            id: apiCommitment.id,
            flagged: apiCommitment.flagged,
            announcementDate: UNIX_TIME_TO_DATE(apiCommitment.announcementDate),
            statements: Commitment.statementObjectsToString(apiCommitment.statements || []),
            created: UNIX_TIME_TO_DATE(apiCommitment.created)
        })
        if (commitment.statements) {
            //     console.log(commitment);
        }
        return commitment;

    }

    static stringsToStatementObjects(statements) {
        let objects = [];
        statements.forEach(statement => {
            objects.push({ "id": statement })
        });
        return objects;
    }

    static statementObjectsToString(statements) {
        let strings = [];
        statements.forEach(statement => {
            strings.push(statement.id);
        });
        return strings;
    }


    static stringsToMinistryObjects(ministries, role) {
        let objects = [];
        ministries.forEach(ministry => {
            objects.push(new Ministry({ "ministryName": ministry, "role": role }))
        });
        return objects;
    }

    static ministryObjectsToString(ministries) {
        let strings = [];
        ministries.forEach(ministry => {
            strings.push(ministry.ministryName);
        });
        return strings;
    }

    static stringsToTagObjects(tags) {
        let tagObjects = [];
        tags.forEach(tag => {
            tagObjects.push(new Tag({ "tag": tag }))
        });
        return tagObjects;
    }

    static tagObjectsToStrings(tags) {
        try {
            let tagStrings = [];
            tags.forEach(tag => {
                tagStrings.push(tag.tag);
            });
            return tagStrings;

        } catch (e) {
            console.error("Unable to convert to list of tags")
        }
    }

}