import { LinkStatementsComponent } from './link-statements/link-statements.component';
import { CommitmentQueryService } from './query-commitment.service';
import { SourcesModule } from '../sources/sources.module';
import { CommitmentsComponent } from './commitments/commitments.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharingModule } from 'app/shared/sharing.module';
import { CreateCommitmentComponent } from './create-commitment/create-commitment.component';
import { CreateCommitmentBtnComponent } from './create-commitment-btn/create-commitment-btn.component';
import { QueryCommitmentComponent } from './query-commitment/query-commitment.component';
import { ViewCommitmentComponent } from './view-commitment/view-commitment.component';
import { SearchModule } from 'app/search/search.module';
import { ViewAllCommitmentsComponent } from './view-all-commitments/view-all-commitments.component';
import { EditCommitmentBtnComponent } from './edit-commitment-btn/edit-commitment-btn.component';
import { StatementListingComponent } from './statement-listing/statement-listing.component';
@NgModule({
  imports: [
    SharingModule,
    SearchModule
  ],
  declarations: [
    CreateCommitmentComponent,
    CreateCommitmentBtnComponent,
    ViewCommitmentComponent,
    QueryCommitmentComponent,
    CommitmentsComponent,
    ViewAllCommitmentsComponent,
    EditCommitmentBtnComponent,
    StatementListingComponent,
    LinkStatementsComponent
  ],
  exports: [
    CreateCommitmentComponent,
    CreateCommitmentBtnComponent,
    ViewCommitmentComponent,
    QueryCommitmentComponent,
    CommitmentsComponent,
    ViewAllCommitmentsComponent,
    EditCommitmentBtnComponent,
    StatementListingComponent,
    LinkStatementsComponent
  ],
  providers: [
    CommitmentQueryService
  ]
})
export class CommitmentModule { }
