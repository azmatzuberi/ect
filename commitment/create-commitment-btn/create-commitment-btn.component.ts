import { MenuItem } from 'primeng/primeng';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Commitment } from "objects/commitment";

@Component({
  selector: 'app-create-commitment-btn',
  templateUrl: './create-commitment-btn.component.html',
  styleUrls: ['./create-commitment-btn.component.css']
})
export class CreateCommitmentBtnComponent implements OnInit {
  @Input() visible: boolean;
  @Input() btnLabel: string;
  @Output() done = new EventEmitter<any>();
  @Input() commitment: Commitment = new Commitment({});
  @Input() disabled: boolean = false;
  @Output() linkToExisting = new EventEmitter<any>();

  items: MenuItem[]
  constructor() {
    this.visible = false;
    this.btnLabel = "New Commitment"
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Link to Commitment', icon: 'fa-edit', command: () => {
          this.linkToExisting.emit();
        }
      }
    ]

  }
  toggleVisible() {
    this.visible = !this.visible;
    this.done.emit();
  }
}
