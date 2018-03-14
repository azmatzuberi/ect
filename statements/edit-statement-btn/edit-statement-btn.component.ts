import { Statement } from '../../../objects/statement';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-statement-btn',
  templateUrl: './edit-statement-btn.component.html',
  styleUrls: ['./edit-statement-btn.component.scss']
})
export class EditStatementBtnComponent implements OnInit {
  visible: boolean = false;
  @Output() done = new EventEmitter<any>();
  @Input() statement: Statement;
  @Input() btnLabel: string = "Edit";
  constructor() { }

  ngOnInit() {
  }

  canceled(event) {
    Object.keys(event).forEach(key => {
      this.statement[key] = event[key];
    }), 
    this.done.emit();
    this.toggleVisible();

  }
  toggleVisible() {
    this.visible = !this.visible;

  }

  complete() {
    this.toggleVisible();
    this.done.emit();
  }

}
