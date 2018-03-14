// import { AppControlService } from '../../app-control.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Source } from "objects/source";
import { AppControlService } from "app/app-control.service";


@Component({
  selector: 'source-form',
  templateUrl: './source-form.component.html',
  styleUrls: ['./source-form.component.css']
})
export class SourceFormComponent implements OnInit {

  @Input() source: Source;
  @Input('show-submit') showSubmit: boolean = true;
  @Output('form-state') formState = new EventEmitter<any>();
  @Output() done = new EventEmitter<any>();

  sourceForm: FormGroup; //Control used for validation for form
  uploadedFiles: any[] = [];
  mediaTypes: Array<any>;
  sourceTypes: Array<any>;
  filteredMediaTypes: Array<any> = new Array();
  filteredSourceTypes: Array<any> = new Array();
  sourceName: "";

  constructor(private formBuilder: FormBuilder, public appControlService: AppControlService) {
    this.reset();
  }

  onChange() {
    this.formState.emit(this.sourceForm.valid);
  }

  ngOnInit() {
    this.sourceForm = this.formBuilder.group({
      'sourceUrl': new FormControl('', Validators.required),
      'publishingDate': new FormControl(''),
      'sourceDocument': new FormControl(''),
      'mediaType': new FormControl('', Validators.required),
      'sourceType': new FormControl('', Validators.required),
    });

    this.mediaTypes = new Array(
      'Party Website',
      'Election Platform',
      'Newspaper',
      'Twitter',
      'Unknown'
    );

    this.sourceTypes = new Array(
      'Supplementary Platform – 2017',
      'Platform 2017',
    );
  }

  fileUploader(event) {
    console.log(event.files);

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.appControlService.currentDocument = e.target.result;
        this.source.sourceName = event.files[0].name;
        console.log(this.source);
      };
      reader.readAsArrayBuffer(event.files[0]);
    }
  }


  onSubmit() {
    this.done.emit();
  }

  filterMediaList(event) {
    let query = event.query;
    this.filteredMediaTypes = this.filterList(query, this.mediaTypes);
  }

  filterSourceList(event) {
    let query = event.query;
    this.filteredSourceTypes = this.filterList(query, this.sourceTypes);
  }

  filterList(find, searchList: any[]) {
    let tempList = [];

    searchList.forEach(data => {
      if (data.toLowerCase().includes(find.toLowerCase())) {
        tempList.push(data);
      }
    });

    return tempList;
  }
  reset() {
    this.source = new Source({});
  }


}
