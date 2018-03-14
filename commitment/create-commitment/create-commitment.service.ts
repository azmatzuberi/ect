import { Commitment } from '../../../objects/commitment';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { THEMES_LINK, TAGS_LINK } from "../../../_config/links-config";
import { SelectItem } from "primeng/primeng";

@Injectable()
export class CreateCommitmentService {
  themeLink: string;
  tagsLink: string
  constructor(private http: Http) {
    this.themeLink = THEMES_LINK;
    this.tagsLink = TAGS_LINK;
  }



  getThemes(party: string) {
    return this.http.get(this.themeLink).map(res => {
      let temp = JSON.parse(res["_body"])["themes"][party];
      let response: SelectItem[] = [];
      temp.forEach(element => {
        response.push({ label: element, value: element });
      })
      return response;
    });
  }

  getTags() {
    return this.http.get(this.tagsLink).map(res => {
      let temp = JSON.parse(res["_body"])["tags"]; //[party];
      let response: SelectItem[] = [];
      temp.forEach(element => {
        response.push({ label: element, value: element });
      })
      return response;

    })
  }

}
