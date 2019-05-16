import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardwallRoutingModule } from './cardwall.routes';
import { CardDetailsModule } from '@app/card-details/card-details.module';
import { SharedModule } from '@app/shared/shared.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './state';

// Libraries
import { ModalModule } from 'ngx-bootstrap/modal';
import { SortablejsModule } from 'angular-sortablejs';

// Containers
/* tslint:disable:max-line-length */
import { CardwallBaseComponent } from './container/cardwall-base.component';
import { CardBaseComponent } from './container/card-base/card-base.component';
import { CardwallCardSearchBaseComponent } from './container/cardwall-card-search-base/cardwall-card-search-base.component';
import { CardwallListsBaseComponent } from './container/cardwall-lists-base/cardwall-lists-base.component';
import { CardwallToolbarContainerComponent } from './container/cardwall-toolbar-container/cardwall-toolbar-container.component';

// Components
import { CardwallNavComponent } from './components/cardwall-nav/cardwall-nav.component';
import { CardwallToolbarComponent } from './components/cardwall-toolbar/cardwall-toolbar.component';
import { CardwallListComponent } from './components/cardwall-lists-view/cardwall-list/cardwall-list.component';
import { CardwallListsViewComponent } from './components/cardwall-lists-view/cardwall-lists-view.component';
import { CardwallSavingComponent } from './components/cardwall-saving/cardwall-saving.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('cardwall', reducers),
    EffectsModule.forFeature(effects),
    CardDetailsModule,
    CardwallRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    SortablejsModule,
  ],
  declarations: [
    CardwallBaseComponent,
    CardBaseComponent,
    CardwallNavComponent,
    CardwallCardSearchBaseComponent,
    CardwallToolbarContainerComponent,
    CardwallToolbarComponent,
    CardwallSavingComponent,
    CardwallListsBaseComponent,
    CardwallListsViewComponent,
    CardwallListComponent,
  ],
})
export class CardwallModule {}
