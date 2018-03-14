import { Statement } from '../../../objects/statement';
import { Component, OnInit, Input } from '@angular/core';
import { Source } from "objects/source";

@Component({
  selector: 'app-add-source-from-pdf',
  templateUrl: './add-source-from-pdf.component.html',
  styleUrls: ['./add-source-from-pdf.component.css']
})
export class AddSourceFromPdfComponent implements OnInit {

  statement: Statement = new Statement({});
  @Input() source: Source = new Source({});

  constructor() { }

  ngOnInit() {
  }

  setStatementText(textObject) {
    this.statement.description = textObject.text;

  }
}
