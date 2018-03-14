import { Source } from '../../../objects/source';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-source-from-pdf-btn',
  templateUrl: './add-source-from-pdf-btn.component.html',
  styleUrls: ['./add-source-from-pdf-btn.component.css']
})
export class AddSourceFromPdfBtnComponent implements OnInit {
  @Input() visible: boolean;
  @Input() btnLabel: string;
  @Input() source: Source = new Source({});
  constructor() {
    this.visible = false;
    this.btnLabel = "Add Statement from Source"

   }

  ngOnInit() {
  }

  toggleVisible(){
    this.visible = !this.visible;
  }

}
