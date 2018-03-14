import { DescriptionList } from '../app/shared/layouts/item-view-layout/item-view-layout.component';
import { Source } from './source';
import { Tag } from "./tag";
import { DATE_TO_UNIX_TIME, UNIX_TIME_TO_DATE } from "util/static-functions";

export class Statement {
    id: string;
    politicalParty: string;

    description: string;
    statementAuthor: string; //Who said the statement
    commitment: string[];
    sources: string[];
    context: string;
    administration: string;
    source: any;
    individual: string;
    created: Date;
    tags: string[];
    commitments: string[] = [];
    announcementDate: Date;
    flagged: boolean;
    createdFormated: string;
    deleted: boolean;
    year: string = "";

    constructor(options: {}) {
        this.id = options["id"] || options["id"] || "";
        this.politicalParty = options['politicalParty'] || ""
        this.description = options["description"] || "";
        this.administration = options["administration"] || "Unknown";
        this.context = options["context"] || "";
        this.source = options["source"] || null;
        this.statementAuthor = options["statementAuthor"] || options["author"] || "";
        this.tags = options["tags"] || [];
        this.sources = options["sources"] || [];
        this.flagged = options["flagged"] == "true";
        this.deleted = options["deleted"] || false;
        this.createdFormated = options["createdFormated"];
        this.created = UNIX_TIME_TO_DATE(options["created"]);
        this.announcementDate = UNIX_TIME_TO_DATE(options["announcementDate"]) || new Date();
        this.setCommitments(options["commitments"] || []);
    }

    setCommitments(commitments) {
        if (commitments.length > 0) {
            if (typeof commitments[0] !== "string") {
                this.commitments = Statement.commitmentObjectsToString(commitments);
            } else {
                this.commitments = commitments;
            }
        } else {
            this.commitments = [];
        }
    }

    asJSONForAPI(update: boolean) {
        return {
            politicalParty: this.politicalParty,
            description: this.description,
            source: this.source,
            created: DATE_TO_UNIX_TIME(this.created),
            commitments: Statement.stringsToCommitmentObjects(this.commitments),
            sourceType: this.context,
            flagger: this.flagged + "",//Must be added to API as string
            deleted: this.deleted + "", //Must be added to API as string, 
            administration: this.administration,
            context: this.context.length > 0 ? this.context : "Pre-Election",
            statementAuthor: this.statementAuthor,
            annoucementDate: DATE_TO_UNIX_TIME(this.announcementDate)
        }
    }

    asExportableData() {
        return {
            "Created": this.created,
            "Context": this.context,
            "Party": this.politicalParty,
            "Statement": this.description,
            "Source Name": this.source ? this.source.sourceName : "Unknown",
            "Tags": this.tags.map(tag => tag["tag"]),
            "Assigned": (this.commitments.length > 0) ? "Yes" : "No"
        }
    }

    asQueryObject() {
        return {
            politicalParty: this.politicalParty,
            "tags.tag": this.tags,
            "context": this.context,
            description: this.description,
            createdFormated: this.year,
            //    flagged: this.flagged ,//Must be added to API as string
            deleted: this.deleted  //Must be added to API as string
        }

    }

    static commitmentObjectsToString(commmitments) {
        let strings = [];
        commmitments.forEach(commitment => {
            strings.push(commitment.id);
        })
        return strings;
    }

    static stringsToCommitmentObjects(commitments) {
        let objects = [];
        commitments.forEach(commitment => {
            objects.push({ "id": commitment })
        });
        return objects;
    }

    fromAPIForm() {
        //TODO: Implement
        console.warn("fromAPIForm() has not been implemented in Statment class");
    }

    asDescriptionList() {
        return [
            new DescriptionList({
                term: "Date",
                descriptions: [this.created]
            }),
            new DescriptionList({
                term: "Context",
                descriptions: [this.context || "Unknown"],
            }),
            new DescriptionList({
                term: "Party",
                descriptions: [this.politicalParty]
            }),
            new DescriptionList({
                term: "Administration",
                descriptions: [this.administration]
            })
        ]
    }

    static ShortProperties = [
        "id",
        "politicalParty",
        // "statementAuthor",
        // "deleted",
        // "context",
        "description",
        // "source",
        // "tags",
        "flagged",
        // "commitments",
        "created"
    ];

    static AllProperties = [

        "id",
        "politicalParty",
        "statementAuthor",
        "deleted",
        "context",
        "description",
        "source",
        "annoucementDate",
        "tags",
        "flagged",
        "commitments",
        "created"

    ];



}
