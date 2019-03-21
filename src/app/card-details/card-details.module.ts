import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './state';

// 3rd Parties
import { UiSwitchModule } from 'ngx-ui-switch';

// Containers
import { AttachmentsBaseComponent } from './container/attachments-base/attachments-base.component';
import { CardDetailsBaseComponent } from './container/card-details-base/card-details-base.component';
import { CardDetailsDialogBaseComponent } from './container/card-details-dialog-base/card-details-dialog-base.component';
import { IssuesBaseComponent } from './container/issues-base/issues-base.component';
import { SubtasksBaseComponent } from './container/subtasks-base/subtasks-base.component';

// Components
import { CardDetailsDialogComponent } from './components/card-details-dialog/card-details-dialog.component';
import { CardDetailsViewComponent } from './components/card-details-view/card-details-view.component';
import { CodeComponent } from './components/code/code.component';
import { EditCardFormComponent } from './components/edit-card-form/edit-card-form.component';
import { FeedComponent } from './components/feed/feed.component';
import { ResourcesListComponent } from './components/edit-card-form/resources-list/resources-list.component';
import { WorkComponent } from './components/work/work.component';

import { CardDetailsRoutingModule } from './card-details-routing.module';

@NgModule({
  declarations: [
    CardDetailsBaseComponent,
    CardDetailsDialogComponent,
    CardDetailsViewComponent,
    CardDetailsDialogBaseComponent,
    EditCardFormComponent,
    FeedComponent,
    WorkComponent,
    IssuesBaseComponent,
    CodeComponent,
    SubtasksBaseComponent,
    AttachmentsBaseComponent,
    ResourcesListComponent,
  ],
  imports: [
    CommonModule,
    CardDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UiSwitchModule,
    StoreModule.forFeature('card-details', reducers),
    EffectsModule.forFeature(effects),
  ],
  exports: [CardDetailsDialogBaseComponent],
})
export class CardDetailsModule {}
