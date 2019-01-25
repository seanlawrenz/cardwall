import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/backlog.reducer';
import { BacklogEffects } from './state/backlog.effects';

// Container
import { BacklogBaseComponent } from './container/backlog-base.component';

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
    RouterModule.forChild(backlogRoutes),
    StoreModule.forFeature('backlog', reducer),
    EffectsModule.forFeature([BacklogEffects]),
  ],
  declarations: [BacklogBaseComponent],
  exports: [BacklogBaseComponent],
})
export class BacklogModule {}
