import { StatementQueryService } from '../statement-query.service';

import { Statement } from '../../../objects/statement';
import { Commitment } from '../../../objects/commitment';
import { CommitmentQueryService } from '../../commitment/query-commitment.service';
import { FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Messages } from "app/shared/messenger/Messenger";

@Component({
  selector: 'app-link-commitments',
  templateUrl: './link-commitments.component.html',
  styleUrls: ['./link-commitments.component.scss'],
  providers: [CommitmentQueryService]
})
export class LinkCommitmentsComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<any>();
  @Output() submitted = new EventEmitter<any>();

  searchControl: FormControl;
  queryObject: Commitment;
  @Input() statement: Statement = new Statement({});

  loading: boolean = false;
  commitments: any;
  truncateLength: number;
  summary: any;
  numRows = 10;
  selectedCommitments: any = [];
  page = 0;

  constructor(
    private commitmentQueryService: CommitmentQueryService,
    private statementQueryService: StatementQueryService
  ) {
    this.searchControl = this.commitmentQueryService.searchControl;
    this.queryObject = this.commitmentQueryService.queryObject;
    this.commitments = this.commitmentQueryService.commitments;
  }

  toggleVisible() {
    this.visible = !this.visible;
  }

  hide() {
    this.onCancel();
  }

  ngOnInit() {




    this.commitmentQueryService.getMessage().subscribe(message => {

      if (message) {
        var messageType = message.data;
        console.log(message)
        switch (messageType) {
          case Messages.UpdateSignal:
            this.loading = true;

            this.commitments = this.commitmentQueryService.commitments.map(data => {
              if (this.statement){
              data = this.removeSelectedCommitments(data);
            }
            this.loading = false;
            this.page = 0;
            this.summary = this.commitmentQueryService.summary;
            return data;
        });
    break;
          case Messages.Completed:
    this.loading = false;
    break;
  }
        this.commitmentQueryService.clearMessage();
      }
    })
  }


removeSelectedCommitments(data) {
  return data.filter(commitment => !this.statement.commitments.includes(commitment.id)); //Removes currently selected statements
}

onCancel() {
  this.toggleVisible();
  this.visibleChange.emit(this.visible);
}

onSubmit() {
  this.statement.commitments = this.statement.commitments.concat(this.selectedCommitments.map(item => item.id));
  this.toggleVisible();
  this.visibleChange.emit(this.visible);
  this.statementQueryService.updateConnectedCommitments(this.statement.id, this.statement.commitments).subscribe(data => {
    this.selectedCommitments = [];
    // this.submitted.emit();

  });

}


  public ngOnChanges(changes: SimpleChanges): void {
  if(this.statement) {
    this.queryObject.party = this.statement.politicalParty;
  }
}
}
