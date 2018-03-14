import { MessageService } from '../message-service/message.service';
import { StatementQueryService } from './statement-query.service';
import { CommitmentModule } from '../commitment/commitment.module';
import { CustomPdfViewerModule } from '../pdf-viewer/pdf-viewer.module';
import { AddStatementComponent } from '../sources/add-statement/add-statement.component';
import { SourcesModule } from '../sources/sources.module';
import { StatementsComponent } from './statements/statements.component';
import { SharingModule } from '../shared/sharing.module';
import { SearchModule } from '../search/search.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateStatementComponent } from "./create-statement/create-statement.component";
import { ViewAllStatementsComponent } from './view-all-statements/view-all-statements.component';
import { AddSourceFromPdfComponent } from './add-source-from-pdf/add-source-from-pdf.component';
import { ViewStatementComponent } from './view-statement/view-statement.component';
import { AddSourceFromPdfBtnComponent } from './add-source-from-pdf-btn/add-source-from-pdf-btn.component';
import { QueryStatementComponent } from './query-statement/query-statement.component';
import { CommitmentListingComponent } from './commitment-listing/commitment-listing.component';
import { EditStatementBtnComponent } from './edit-statement-btn/edit-statement-btn.component';
import { LinkCommitmentsComponent } from './link-commitments/link-commitments.component';

@NgModule({
  imports: [
    SharingModule,
    SearchModule,
    CustomPdfViewerModule,
    CommitmentModule
  ],
  declarations: [
    StatementsComponent,
    CreateStatementComponent,
    AddStatementComponent,
    ViewAllStatementsComponent,
    AddSourceFromPdfComponent,
    ViewStatementComponent,

    AddSourceFromPdfBtnComponent,
    QueryStatementComponent,
    CommitmentListingComponent,
    EditStatementBtnComponent,
    LinkCommitmentsComponent,
  ],
  exports: [
    StatementsComponent,
    CreateStatementComponent,
    AddStatementComponent,
    ViewAllStatementsComponent,
    AddSourceFromPdfComponent,
    ViewStatementComponent,
 
    AddSourceFromPdfBtnComponent,
    QueryStatementComponent, 
    CommitmentListingComponent,
    LinkCommitmentsComponent
  ],

  providers: [ StatementQueryService, MessageService]
})
export class StatementModule { }
