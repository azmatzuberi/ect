import { ConfirmationService } from 'primeng/primeng';
import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { MenuItem } from 'primeng/primeng';

import { CreateCommitmentService } from './create-commitment.service';
import { AppControlService } from 'app/app-control.service';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Commitment } from "objects/commitment";
import { Ministry } from "objects/ministry";
import { Tag } from "objects/tag";

@Component({
  selector: 'app-create-commitment',
  templateUrl: './create-commitment.component.html',
  styleUrls: ['./create-commitment.component.css'],
  providers: [CreateCommitmentService]
})


export class CreateCommitmentComponent implements OnInit {
  @Input() commitment: Commitment = new Commitment({});
  @Input() party: string;
  @Input() visible: boolean = false;
  @Output() done = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Input('edit-mode') editMode: boolean = false;
  @Input('header-text') headerText: string;

  commitmentForm: FormGroup;
  commitmentCopy: Commitment;
  leadMinistry: string;
  themes: any;
  tags: any;
  maxlength = 255;
  pDate: Date;
  autoAdd: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private createCommitmentService: CreateCommitmentService,
    private apiConnectorService: ApiConnectorService,
    private appControlService: AppControlService,
    private confirmationService: ConfirmationService
  ) {

  }


  onCancel() {

    // this.visible = false;
    this.cancel.emit(this.commitmentCopy);
  }
  setMinistry(e) {
    // this.commitment.ministries = [new Ministry({ 'name': e, 'role': 'lead' })];
  }
  onSubmit() {

        this.checkMinistries();

    if (this.commitment.statements.length > 0) {
      if (typeof this.commitment.statements[0] !== "string") {
        this.commitment.statements = this.commitment.statements.map(data => data["id"]);
      }
    }



    this.apiConnectorService.addCommitment(this.commitment).subscribe(data => {

      this.appControlService.newGrowlMessage({
        severity: 'success',
        summary: 'Item Created',
        detail: "New commitment has been saved"
      })
      console.log("====SUCCESSFULLY ADDED====\n%s", JSON.stringify(this.commitment))
      this.done.emit();
    });

  }

  checkMinistries(){
    if(this.commitment.context.toLowerCase() == "election" ){
      this.commitment.leadMinistries = [];
      this.commitment.supportingMinistries = [];
    }
  }
  saveEdit() {

    this.checkMinistries();
    
    this.apiConnectorService.updateAllCommitment(this.commitment).subscribe(data => {
      this.appControlService.newGrowlMessage({
        severity: 'success',
        summary: 'Saved',
        detail: "Changes have been saved"
      })
      this.done.emit();
    });
  }

  ngOnInit() {

    this.commitmentForm = this.formBuilder.group({
      'title': new FormControl('', Validators.required),
      'theme': new FormControl(''),
      'image': new FormControl(''),
      'tags': new FormControl('')
    });


    this.autoAdd = true;
    this.commitment = <Commitment>this.commitment;


    if (this.editMode) {
      this.commitmentCopy = new Commitment(this.commitment);
    }

    console.log(this.commitment.created);
  }


  setHeaderText() {
    this.headerText = ((this.editMode) ? "Edit" : "Create") + " Commitment";
  }

  delete() {
    this.apiConnectorService.deleteCommitment(this.commitment.id).subscribe(data => {

      this.appControlService.newGrowlMessage({
        severity: 'Info',
        summary: 'Deleted',
        detail: "Commitment has been deleted"
      })
      console.log("Commitment %s has been soft deleted", this.commitment.id);
      this.done.emit();
    }, (error => {
      console.warn("Could not delete commitment %s", this.commitment.id);
    }))
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this commitment?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.delete();
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

}
