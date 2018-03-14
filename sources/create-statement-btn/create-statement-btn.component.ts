import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-statement-btn',
  templateUrl: './create-statement-btn.component.html',
  styleUrls: ['./create-statement-btn.component.css']
})
export class CreateStatementBtnComponent implements OnInit {

  @Input() visible: boolean;
  @Input() btnLabel: string;

  constructor() {
    this.visible = false;
    this.btnLabel = "New Statement"
  }

  ngOnInit() {

  }
  toggleVisible() {
    this.visible = !this.visible;
  }
}
