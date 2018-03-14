import { Component, Input, OnInit } from '@angular/core';
import { Source } from "objects/source";
import { StatementQueryService } from '../../statements/statement-query.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-statement-from-source-btn',
  templateUrl: './add-statement-from-source-btn.component.html',
  styleUrls: ['./add-statement-from-source-btn.component.scss']
})
export class AddStatementFromSourceBtnComponent implements OnInit {
  @Input() visible: boolean;
  @Input() btnLabel: string;
  @Input() source: Source = new Source({});
  subscription: Subscription;
  constructor(private statementQueryService: StatementQueryService) {
    this.visible = false;
    this.btnLabel = "New Statement";

  }

  ngOnInit() {
    this.subscription = this.statementQueryService.currentCloseDialog.subscribe(event => this.closeDialog());
  }

  toggleVisible() {
    this.visible = !this.visible;
  }

  closeDialog() {
    this.visible = false;
  }
}
