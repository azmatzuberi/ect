import { QuerySourcesService } from './query-sources.service';
import { MessageService } from '../message-service/message.service';
import { StatementModule } from '../statements/statement.module';
import { SourcesComponent } from './sources/sources.component';
import { SourceDisplayService} from './source-display/source-display.service';
import { NgModule } from '@angular/core';
import { SharingModule } from 'app/shared/sharing.module';
import { CreateStatementBtnComponent } from '../sources/create-statement-btn/create-statement-btn.component';
import { SourceFormComponent } from './source-form/source-form.component';
import { AddStatementComponent } from './add-statement/add-statement.component';
import { ResultDisplayPanelComponent } from './source-results-display-panel/result-display-panel.component';
import { SourceDisplayComponent } from './source-display/source-display.component';
import { CommitmentModule } from 'app/commitment/commitment.module';
import { SourceDetailsComponent } from './source-details-panel/source-details.component';
import { SourceStatementsComponent } from './source-display/source-statements/source-statements.component';
import { StatementDisplayComponent } from './source-results-display-panel/statement-display/statement-display.component';
import { QuerySourceComponent } from './query-sources/query-sources.component';
import { SearchModule } from '../search/search.module';
import { TruncatePipe } from './source-details-panel/truncate';
import { DatePipe } from '@angular/common';
import { InputSwitchModule, InputTextModule, OverlayPanelModule, AccordionModule} from 'primeng/primeng';
import { AddStatementFromSourceComponent } from './add-statement-from-source/add-statement-from-source.component';
import { CustomPdfViewerModule } from "app/pdf-viewer/pdf-viewer.module";
import { AddStatementFromSourceBtnComponent } from './add-statement-from-source-btn/add-statement-from-source-btn.component';
import { SourceTypesComponent } from 'app/sources/source-types/source-types.component';
import { SourceYearsComponent } from './source-years/source-years.component';



@NgModule({
  imports: [
    SharingModule,
    CommitmentModule,
    StatementModule,
    SearchModule,
    InputSwitchModule,
    InputTextModule,
    OverlayPanelModule,
    AccordionModule, 
    CustomPdfViewerModule
  ],
  declarations: [
    SourceFormComponent,
    SourcesComponent,
    ResultDisplayPanelComponent,
    SourceDisplayComponent,
    CreateStatementBtnComponent,
    SourceDetailsComponent,
    SourceStatementsComponent,
    StatementDisplayComponent,
    QuerySourceComponent,
    TruncatePipe,
    AddStatementFromSourceComponent,
    AddStatementFromSourceBtnComponent,
    SourceTypesComponent,
    SourceYearsComponent
  ],
  exports: [
    SourceFormComponent,
    SourcesComponent,
    ResultDisplayPanelComponent,
    SourceDisplayComponent,
    CreateStatementBtnComponent,
    SourceDetailsComponent,
    SourceStatementsComponent,
    StatementDisplayComponent,
    QuerySourceComponent,
    SourceTypesComponent
  ],
  providers: [SourceDisplayService, DatePipe, MessageService, QuerySourcesService],
})
export class SourcesModule { }