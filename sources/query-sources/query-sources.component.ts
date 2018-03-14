import { FormControl } from '@angular/forms';
import { QuerySourcesService } from '../query-sources.service';
import { Source } from '../../../objects/source';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from "primeng/primeng";
import { SourceDisplayService } from "../source-display/source-display.service";

@Component({
  selector: 'app-query-sources',
  templateUrl: './query-sources.component.html',
  styleUrls: ['./query-sources.component.css']
})
export class QuerySourceComponent implements OnInit {

  searchString: string;
  electionTime: boolean = true;
  selectionYear: string;
  selectionType: string;
  selectionParty: string;
  searchControl: FormControl;

  @Input() sources: Source;

  statementSearchField: any;
  selectedYear: SelectItem[];
  selectedValue: string; 
  selectedParty: SelectItem[];
  selectedType: SelectItem[];

  queryObject: Source;
  constructor(
    private sourceDisplayService: SourceDisplayService,
    private querySourcesService: QuerySourcesService
  ) {
    this.sources = new Source({})

    let currentYear = (new Date()).getFullYear();

    this.queryObject = this.querySourcesService.queryObject;
    this.searchControl = this.querySourcesService.searchControl;
  }

  ngOnInit() {
    console.log(this.electionTime);
  }

  onChange() {
    this.querySourcesService.updateQuery();
  }

  reset(){
    this.queryObject.context = "";
    this.queryObject.politicalParty = "";
    this.queryObject.sourceType = "";
    this.queryObject.sourceName = ""
    this.queryObject.publishedDate = "";
    this.onChange();
  }

}
