import { AppControlService } from './../../app-control.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-display-panel',
  templateUrl: './result-display-panel.component.html',
  styleUrls: ['./result-display-panel.component.css']
})

export class ResultDisplayPanelComponent implements OnInit {
  unassigned: boolean;
  deleteEvent: boolean = false;
  constructor(private appControlService: AppControlService) {
    this.unassigned = this.appControlService.unassigned;
  }

  ngOnInit() {
  }

}
