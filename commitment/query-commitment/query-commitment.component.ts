import { START_YEAR } from '../../../_config/_config';
import { FormControl } from '@angular/forms';
import { CommitmentQueryService } from '../query-commitment.service';
import { Commitment } from '../../../objects/commitment';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from "primeng/primeng";

@Component({
  selector: 'app-query-commitment',
  templateUrl: './query-commitment.component.html',
  styleUrls: ['./query-commitment.component.css']
})
export class QueryCommitmentComponent implements OnInit {
  @Input() commitment: Commitment;
  tabOptions: MenuItem[];
  searchControl: FormControl;
  queryObject: Commitment;
  startYear: number;
  constructor(private commitmentQueryService: CommitmentQueryService) {
    this.searchControl = this.commitmentQueryService.searchControl;
    this.queryObject = this.commitmentQueryService.queryObject;


  }

  ngOnInit() {
    this.commitment = new Commitment({})
    this.startYear = START_YEAR;

    this.tabOptions = [
      { label: 'Pre-Election', icon: '' },
      { label: 'Post-Election', icon: '' }
    ]

  }
  reset() {
    this.queryObject.party = "";
    this.queryObject.context = "";
    this.queryObject.tags = [];
    this.queryObject.administration = "";
    this.queryObject.year = "";

    this.onChange();
  }
  onChange() {
    this.commitmentQueryService.updateQuery();
  }

}
