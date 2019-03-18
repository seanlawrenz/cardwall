import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NgRx
import { StoreModule } from '@ngrx/store';
import { reducers } from './state';

// Containers
import { CardDetailsBaseComponent } from './container/card-details-base/card-details-base.component';

// Components
import { CardDetailsDialogComponent } from './components/card-details-dialog/card-details-dialog.component';

import { CardDetailsRoutingModule } from './card-details-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [CardDetailsBaseComponent, CardDetailsDialogComponent],
  imports: [CommonModule, CardDetailsRoutingModule, SharedModule, StoreModule.forFeature('card-details', reducers)],
  exports: [CardDetailsBaseComponent],
})
export class CardDetailsModule {}
