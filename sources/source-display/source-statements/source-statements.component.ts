
// import { sourceUrl } from '@angular/compiler';
import { SourceStatementsService } from './source-statements.service';
import { Source } from 'objects/source';
import { Statement } from 'objects/statement';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-source-statements',
  templateUrl: './source-statements.component.html',
  styleUrls: ['./source-statements.component.css'],
  providers: [SourceStatementsService]
})
export class SourceStatementsComponent implements OnInit {

  statements: any[];

  
  
  constructor(private InnerDatatableDisplayService: SourceStatementsService) {

  }
  
  ngOnInit() {
    this.InnerDatatableDisplayService.getStatementsBySource().subscribe(statements => {this.statements = statements;});

  }

}
  