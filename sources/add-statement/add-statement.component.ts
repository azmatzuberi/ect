import { Statement } from 'objects/statement';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from "primeng/primeng";
import { Source } from "objects/source";

@Component({
  selector: 'add-statement',
  templateUrl: './add-statement.component.html',
  styleUrls: ['./add-statement.component.css']
})
export class AddStatementComponent implements OnInit {

  @Input() source: Source;
  @Input() statement: Statement;
  @Input() header: string = "Step 2 - Add Statement"
  @Output('source-toggle') sourceToggle = new EventEmitter<any>();
  @Output() submitted = new EventEmitter<any>();
  @Input() tagList: SelectItem[];
  statementForm: FormGroup;
  numSelected: number = 0;
  constructor(private formBuilder: FormBuilder) {
    this.reset();
    this.tagList = [
      { label: "Legislation", value: "Legislation" },
      { label: "Time", value: "Time" },
      { label: "Money", value: "Money" },
      { label: "Benchmark", value: "Benchmark" }
    ]
  }

  selected(tag) {
    console.log(tag);
    tag.selected ? this.numSelected++ : this.numSelected--;
  }

  ngOnInit() {
    this.statementForm = this.formBuilder.group({
      'pageNumber': new FormControl(''),
      'lineNumber': new FormControl(''),
      'statementText': new FormControl('', Validators.required)

    });
  }

  onSubmit() {
    this.submitted.emit(this.source);
    this.statementForm.reset();
  }
  reset() {
    this.source = new Source({});
    this.statement = new Statement({});

  }

  openSource() {
    this.sourceToggle.emit();
  }
}
