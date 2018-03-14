import { Observable } from 'rxjs/Rx';
import { CommitmentQueryService } from '../query-commitment.service';
import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { Commitment } from '../../../objects/commitment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commitments',
  templateUrl: './commitments.component.html',
  styleUrls: ['./commitments.component.css']
})
export class CommitmentsComponent implements OnInit {

  commitments: any;
  selectedItem: Commitment;
  loadingData: boolean = false;
  commitmentObservable: Observable<any>;
  constructor(private apiConnectorService: ApiConnectorService,
    private commitmentQueryService: CommitmentQueryService) { }

  viewItem(item) {
    this.setItem(item.id);

  }

  setItem(id) {
    this.loadingData = true;
    this.commitmentObservable = this.apiConnectorService.getCommitmentById(id).map(data => { 
      this.loadingData = false;
      return data[0] ? Commitment.fromAPIForm(data[0]) : new Commitment({ id: "-1" })
    });
  }

  ngOnInit() {
  }

  refreshCommitments() {
    this.commitmentQueryService.updateQuery();
  }




}
