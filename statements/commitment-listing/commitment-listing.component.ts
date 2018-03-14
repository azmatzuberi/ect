import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Commitment } from "objects/commitment";

@Component({
  selector: 'app-commitment-listing',
  templateUrl: './commitment-listing.component.html',
  styleUrls: ['./commitment-listing.component.scss']
})
export class CommitmentListingComponent implements OnInit, OnChanges {
  @Input() commitments: string[]; //list of commitment ids
  @Output() commitmentsChange = new EventEmitter<any>();
  @Output() unlinkItem = new EventEmitter<any>();
  @Input() truncateLength: number = 100;
  commitmentsObservable: Observable<any>;
  loading: boolean = true;
  @ViewChild('filter') filter: any;
  constructor(private apiConnectorService: ApiConnectorService) {
    this.commitments = [];
  }

  unlink(commitment) {
    this.commitments = this.commitments.filter(commitmentId => commitmentId != commitment.id);
    this.commitmentsChange.emit(this.commitments);
  }
  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges): void {

    if (this.commitments && this.commitments.length > 0) {
      this.loading = true;
      this.commitments.forEach((commitment, index) => {
        var self = this;
        this.commitmentsObservable = (index == 0) ? this.apiConnectorService.getCommitmentById(commitment).map(data => {
          self.loading = !(this.commitments.length - 1 == index);

          return data.map(commitment => Commitment.fromAPIForm(commitment));
        }) : this.commitmentsObservable.mergeMap(data => {
          return this.apiConnectorService.getCommitmentById(commitment).map(innerData => {
            self.loading = !(this.commitments.length - 1 == index);
            return data.concat(innerData.map(commitment => Commitment.fromAPIForm(commitment)));

          })
        });
      });
    } else {
      this.commitmentsObservable = null;
      this.loading = false;
    }

  }

}
