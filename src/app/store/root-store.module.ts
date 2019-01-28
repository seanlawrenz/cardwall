import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forRoot(reducers), EffectsModule.forRoot([])],
})
export class RootStoreModule {}
