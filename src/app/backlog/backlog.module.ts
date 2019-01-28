import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/backlog.reducer';
import { BacklogEffects } from './state/backlog.effects';

// Libraries
import { ModalModule } from 'ngx-bootstrap/modal';

// Container
import { BacklogBaseComponent } from './container/backlog-base.component';
import { AddBoardDiagramComponent } from './components/add-board-diagram/add-board-diagram.component';

// Components

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
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(backlogRoutes),
    StoreModule.forFeature('backlog', reducer),
    EffectsModule.forFeature([BacklogEffects]),
  ],
  declarations: [BacklogBaseComponent, AddBoardDiagramComponent],
  exports: [BacklogBaseComponent],
})
export class BacklogModule {}
