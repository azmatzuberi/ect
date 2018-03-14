import { Statement } from '../../../objects/statement';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Source } from "objects/source";

@Component({
  selector: 'app-add-statement-from-source',
  templateUrl: './add-statement-from-source.component.html',
  styleUrls: ['./add-statement-from-source.component.scss']
})
export class AddStatementFromSourceComponent implements OnInit, OnChanges {
statement: Statement = new Statement({});
  @Input() source: Source = new Source({});
  sourceId: string = "-1";

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){

    if(this.source && this.sourceId !== this.source.id){
      console.log(this.source);
      this.sourceId = this.source.id;
      this.statement.politicalParty = this.source.politicalParty;
      this.statement.source = {
        sourceId: this.source.id
      }
      this.statement.created = new Date();
    }
  }

  setStatementText(textObject) {
    this.statement.description = textObject.text;
  }
}
