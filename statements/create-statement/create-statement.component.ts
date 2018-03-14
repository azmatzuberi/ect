import { AppControlService } from '../../app-control.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { ApiConnectorService } from '../../_app-services/api-connector.service';
import { Statement } from '../../../objects/statement';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Source } from "objects/source";
import { StatementQueryService } from '../statement-query.service';

@Component({
  selector: 'app-create-statement',
  templateUrl: './create-statement.component.html',
  styleUrls: ['./create-statement.component.css']
})
export class CreateStatementComponent implements OnInit {

  @Input() statement: Statement = new Statement({});
  @Input() source: Source;
  statementCopy: Statement; //Store original statement when editing

  @Input('edit-mode') editMode: boolean = false;

  @Input() showHeader: boolean = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() done = new EventEmitter<any>();
  formGroup: FormGroup;

  constructor(
    private apiConnectorService: ApiConnectorService,
    private confirmationService: ConfirmationService,
    private appControlService: AppControlService,
    private formBuilder: FormBuilder,
    private statementQueryService: StatementQueryService
  ) {

  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      // 'politicalParty' : new FormControl('', Validators.required),
      // 'created': new FormControl('', Validators.required),
      'text': new FormControl('', Validators.compose([Validators.required])),
      'individual': new FormControl('', Validators.compose([Validators.required]))
    })
    if (this.editMode) { //If edit mode
      this.setEditModeConfig();
    }
    this.statement.created = new Date();
    if (this.source) {
      this.statement.politicalParty = this.source.politicalParty;
    }
  }

  onCancel() {
    this.cancel.emit(this.statementCopy); //Returning orignal statement
  }

  setEditModeConfig() {
    // this.showHeader  = true;
    this.statementCopy = new Statement(this.statement);
  }

  saveEdit() {
    this.statement.source.sourceId = this.source.id;
    console.log("test");
    this.apiConnectorService.updateAllStatement(this.statement).subscribe(data => {
      console.log("Statement %s has been updated", this.statement.id);
      this.appControlService.newGrowlMessage({
        severity: 'success',
        summary: 'Saved',
        detail: "Changes have been saved"
      })
      this.done.emit();
    },
      (error => {
        console.warn("Failed to update statement %s", this.statement.id);
      })

    )
  }

  onSubmit() {
    this.statement.source.sourceId = this.source.sourceId;
    this.statement.source.sourceType = this.source.sourceType;
    this.apiConnectorService.addStatement(this.statement).subscribe(data => {
      console.log("statement " + this.statement);
      this.appControlService.newGrowlMessage({
        severity: 'success',
        summary: 'Item Created',
        detail: "Statement has been saved"
      })
      this.formGroup.reset();
      this.statementQueryService.closeDialogFunction();
      this.statement = new Statement(
        {
          "politicalParty": this.statement.politicalParty,
          "source": { "sourceId": this.source.id },
          "created": null,
          "annoucementDate": null
        });
    });
  }
  delete() {
    this.apiConnectorService.deleteStatement(this.statement.id).subscribe(data => {
      this.appControlService.newGrowlMessage({
        severity: 'info',
        summary: 'Deleted',
        detail: "Statement has been deleted"
      })
      console.log("Statetment %s has been soft deleted", this.statement.id);
      this.done.emit();
    }, (error => {
      console.warn("Could not delete statement %s", this.statement.id);
    }))
  }
  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this statement?',
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
