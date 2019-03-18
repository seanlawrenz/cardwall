import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

// NgRx
import { StoreModule } from '@ngrx/store';
import { reducers } from './state';

// Containers
import { CardDetailsBaseComponent } from './container/card-details-base/card-details-base.component';
import { CardDetailsDialogBaseComponent } from './container/card-details-dialog-base/card-details-dialog-base.component';

// Components
import { CardDetailsDialogComponent } from './components/card-details-dialog/card-details-dialog.component';
import { CardDetailsViewComponent } from './components/card-details-view/card-details-view.component';

import { CardDetailsRoutingModule } from './card-details-routing.module';

@NgModule({
  declarations: [CardDetailsBaseComponent, CardDetailsDialogComponent, CardDetailsViewComponent, CardDetailsDialogBaseComponent],
  imports: [CommonModule, CardDetailsRoutingModule, SharedModule, StoreModule.forFeature('card-details', reducers)],
  exports: [CardDetailsDialogBaseComponent],
})
export class CardDetailsModule {}
