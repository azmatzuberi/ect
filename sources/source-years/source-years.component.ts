import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseSelector } from 'app/search/base-selector';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-source-years',
  templateUrl: './source-years.component.html',
  styleUrls: ['./source-years.component.scss']
})

export class SourceYearsComponent extends BaseSelector implements OnInit {
  @Output() selectedYearEmit: EventEmitter<any> = new EventEmitter();
  
  constructor() {
    super();
  }

  @Input() selectedValue: any;

  ngOnInit() {

    let currentYear = (new Date()).getFullYear();
    this.selectedYear = [
      { label: 'Select Year', value: ''},
      { label: 'Present Year', value: currentYear}];

    var year = currentYear + 2;
    
    for (year; year > 2008; year--) {
      this.selectedYear.push({ label:'' + [year] + '', value : '' + [year] + ''});
    }

  }

  selectedYear: SelectItem[];

  onChange() {
    this.selectedYearEmit.emit();
  } 

}
