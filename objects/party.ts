import { Commitment } from '../objects/commitment';
import { ADD_ITEM_AT_INDEX } from '../util/static-functions';
import { Statement } from "./statement";

export class Party {
    name: string;
    primaryColor: string; //hex code for the party
    lighterColor: string;
    logo: string; //path to the logo for the party 
    class: string;
    fontColor: string;

    constructor(options: {}) {
        this.name = options['name'] || "";
        this.class = options['class'] || "";
        this.primaryColor = options['primaryColor'] || "#000";
        this.lighterColor = options['lighterColor'] || "#000";
        this.logo = options['logo'] || "";
        this.fontColor = options['fontColor'] || "#000";
    }
}

