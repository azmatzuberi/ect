import { FormControl } from '@angular/forms';
import { CommitmentQueryService } from '../query-commitment.service';

import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Commitment } from "objects/commitment";
import { Subscription } from "rxjs/Subscription";
import { CSVGenerator } from "app/shared/data-export/CSVGenerator";
import { Messages } from "app/message-service/message.service";

@Component({
  selector: 'app-view-all-commitments',
  templateUrl: './view-all-commitments.component.html',
  styleUrls: ['./view-all-commitments.component.css']
})
export class ViewAllCommitmentsComponent implements OnInit, OnDestroy {
  @Input() commitments: Observable<any>;
  @Output() itemSelected = new EventEmitter<any>();
  loading: boolean = true;

  @Input() selectedItems = [];
  @Output() selectedItemsOnChange = new EventEmitter<any>();

  searchControl: FormControl;
  queryObject: Commitment;
  summary: any;
  numRows = 10;
  page = 0;
  constructor(
    private apiConnectorServices: ApiConnectorService,
    private commitmentQueryService: CommitmentQueryService,
  ) {

    this.searchControl = this.commitmentQueryService.searchControl;
    this.queryObject = this.commitmentQueryService.queryObject;
    this.commitments = this.commitmentQueryService.commitments;
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

  updateSelection(event) {
    console.log(JSON.stringify(event));
    this.selectItem(event.data);
    // console.log(this.selectedItems.length);
  }

  convertCommitments(data) {
    let tempList = [];
    data.forEach(commitment => {
      tempList.push(Commitment.fromAPIForm(commitment))
    })

    return tempList;
  }
  selectItem(item) {
    this.itemSelected.emit(item);
  }

  flagItem(item) {


    this.commitmentQueryService.toggleItemFlag(item.id, item.flagged).subscribe(data => {
      console.log("Commitment %s - Flag Toggled", item.id);
    });
  }


  exportData() {
    var dataSub: Subscription = this.commitmentQueryService.getAllDataForExport().subscribe(data => {
      CSVGenerator.objectsToCSV(data, "Commitments-" + new Date());
      dataSub.unsubscribe();
    })

  }



  public ngOnDestroy(): void {
    // this.commitmentQueryService.cl
  }
}
