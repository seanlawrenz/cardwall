import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardwallRoutingModule } from './cardwall.routes';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './state';

// Libraries

// Containers
/* tslint:disable:max-line-length */
import { CardwallBaseComponent } from './container/cardwall-base.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('cardwall', reducers),
    EffectsModule.forFeature(effects),
    CardwallRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CardwallBaseComponent],
})
export class CardwallModule {}
