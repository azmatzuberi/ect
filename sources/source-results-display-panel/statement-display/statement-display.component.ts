
import { StatementDisplayService } from './statement-display.service';
import { Source } from '../../../../objects/source';
import { Statement } from '../../../../objects/statement';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-statement-display',
  templateUrl: './statement-display.component.html',
  styleUrls: ['./statement-display.component.css'],
  providers: [StatementDisplayService]
})
export class StatementDisplayComponent implements OnInit {

  statements: any[];

  
  
  constructor(private StatementDisplayService: StatementDisplayService) {

  }
  
  ngOnInit() {
    this.StatementDisplayService.getStatementsBySource().subscribe(statements => {this.statements = statements;});

  }

}
  