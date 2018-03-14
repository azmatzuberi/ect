import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { QuerySourcesService } from '../query-sources.service';
import { BaseSelector } from '../../search/base-selector';

@Component({
  selector: 'app-source-types',
  templateUrl: './source-types.component.html',
  styleUrls: ['./source-types.component.scss']
})
export class SourceTypesComponent extends BaseSelector implements OnInit {
  @Output() selectedTypeEmit: EventEmitter<any> = new EventEmitter();
  
  constructor() {
    super();
  }

  @Input() selectedValue: any;

  ngOnInit() {

    this.selectedType = [
      { label: 'Select Type', value: ''},
      { label: 'Budget', value: 'Budget' },
      { label: 'Facebook', value: 'Facebook' },
      { label: 'Mandate Letters', value: 'Mandate Letters' },
      { label: 'News Media', value: 'News Media' },
      { label: 'Other', value: 'Other' },
      { label: 'Platform', value: 'Platform' },
      { label: 'Scrum', value: 'Scrum' },
      { label: 'Speeches', value: 'Speeches' },
      { label: 'Throne Speech', value: 'Throne Speech' },
      { label: 'Twitter', value: 'Twitter' }
    ];

  }

  selectedType: SelectItem[];

  onChange() {
    this.selectedTypeEmit.emit();
  }
  
}
