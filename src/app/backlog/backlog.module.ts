import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { CardDetailsModule } from '@app/card-details/card-details.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './state';

// Libraries
import { SortablejsModule } from 'angular-sortablejs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DragAndDropModule } from 'angular-draggable-droppable';

// Container
/* tslint:disable:max-line-length */
import { AddBoardBaseComponent } from './container/add-board-base/add-board-base.component';
import { BacklogBaseComponent } from './container/backlog-base.component';
import { BacklogCardsControllerComponent } from './container/backlog-cards-controller/backlog-cards-controller.component';
import { BacklogCardControllerComponent } from './container/backlog-cards-controller/backlog-card-controller/backlog-card-controller.component';
import { BoardsControllerComponent } from './container/boards-controller/boards-controller.component';
import { BacklogMoveToolbarComponent } from './container/backlog-move-toolbar/backlog-move-toolbar.component';
import { BacklogListControllerComponent } from './container/backlog-list-controller/backlog-list-controller.component';
import { BacklogResourceControllerComponent } from './container/backlog-resource-controller/backlog-resource-controller.component';
import { BacklogSettingsContainerComponent } from './container/backlog-settings-container/backlog-settings-container.component';
import { BacklogToolbarContainerComponent } from './container/backlog-toolbar-container/backlog-toolbar-container.component';
import { CardSearchBaseComponent } from './container/card-search-base/card-search-base.component';
import { RemoveBoardComponent } from './container/remove-board/remove-board.component';

// Components
import { BacklogBoardHeaderComponent } from './components/backlog-container/backlog-board-header/backlog-board-header.component';
import { BacklogCardComponent } from './components/backlog-container/backlog-card/backlog-card.component';
import { BacklogContainerComponent } from './components/backlog-container/backlog-container.component';
import { AddBoardDiagramComponent } from './components/backlog-container/add-board-diagram/add-board-diagram.component';
import { BacklogListComponent } from './components/backlog-container/backlog-list/backlog-list.component';
import { BacklogNavComponent } from './components/backlog-container/backlog-nav/backlog-nav.component';
import { BacklogResourcesComponent } from './components/backlog-container/backlog-toolbar/backlog-resources/backlog-resources.component';
import { BacklogSettingsComponent } from './components/backlog-container/backlog-settings/backlog-settings.component';
import { BacklogToolbarComponent } from './components/backlog-container/backlog-toolbar/backlog-toolbar.component';
import { BacklogTotalsComponent } from './components/backlog-container/backlog-toolbar/backlog-totals/backlog-totals.component';

const backlogRoutes: Routes = [
  {
    path: '',
    component: BacklogBaseComponent,
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [
    CommonModule,
    DragAndDropModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(backlogRoutes),
    StoreModule.forFeature('backlog', reducers),
    EffectsModule.forFeature(effects),
    SortablejsModule,
    CardDetailsModule,
    SharedModule,
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    BacklogBaseComponent,
    AddBoardDiagramComponent,
    AddBoardBaseComponent,
    BacklogContainerComponent,
    BacklogNavComponent,
    BacklogMoveToolbarComponent,
    BacklogBoardHeaderComponent,
    BacklogListComponent,
    BacklogCardComponent,
    RemoveBoardComponent,
    BoardsControllerComponent,
    BacklogListControllerComponent,
    BacklogCardsControllerComponent,
    BacklogSettingsComponent,
    BacklogSettingsContainerComponent,
    BacklogToolbarContainerComponent,
    BacklogToolbarComponent,
    BacklogResourcesComponent,
    BacklogTotalsComponent,
    BacklogCardControllerComponent,
    BacklogResourceControllerComponent,
    CardSearchBaseComponent,
  ],
  exports: [BacklogBaseComponent],
})
export class BacklogModule {}
