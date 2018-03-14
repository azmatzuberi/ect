import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Commitment } from "objects/commitment";

@Component({
  selector: 'app-edit-commitment-btn',
  templateUrl: './edit-commitment-btn.component.html',
  styleUrls: ['./edit-commitment-btn.component.css']
})
export class EditCommitmentBtnComponent implements OnInit {
  @Input() visible: boolean;
  @Input() btnLabel: string;
  @Input() commitment: Commitment;
  @Output() done = new EventEmitter<any>();

  constructor() {
    this.visible = false;
    this.btnLabel = "Edit"
  }

  ngOnInit() {

  }
  canceled(event) {
    this.visible = !this.visible;
    Object.keys(event).forEach(key => {
      this.commitment[key] = event[key];
    })
  }
  toggleVisible() {
    this.visible = !this.visible;
    this.done.emit();
  }
}
