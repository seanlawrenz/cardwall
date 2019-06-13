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
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SortablejsModule } from 'angular-sortablejs';

// Containers
/* tslint:disable:max-line-length */
import { AddResourceComponent } from './container/add-resource/add-resource.component';
import { CardwallBaseComponent } from './container/cardwall-base.component';
import { CardBaseComponent } from './container/card-base/card-base.component';
import { CardwallCardsBaseComponent } from './container/cardwall-cards-base/cardwall-cards-base.component';
import { CardwallCardSearchBaseComponent } from './container/cardwall-card-search-base/cardwall-card-search-base.component';
import { CardwallListsBaseComponent } from './container/cardwall-lists-base/cardwall-lists-base.component';
import { CardwallSettingsContainerComponent } from './container/cardwall-settings-container/cardwall-settings-container.component';
import { CardwallResourcesViewComponent } from './container/cardwall-resources-view/cardwall-resources-view.component';
import { CardwallToolbarContainerComponent } from './container/cardwall-toolbar-container/cardwall-toolbar-container.component';
import { TotalsContainerComponent } from './container/totals-container/totals-container.component';

// Components
import { AddCardComponent } from './container/add-card/add-card.component';
import { CardViewComponent } from './components/card-view/card-view.component';
import { CardwallCardsViewComponent } from './components/cardwall-cards-view/cardwall-cards-view.component';
import { CardwallNavComponent } from './components/cardwall-nav/cardwall-nav.component';
import { CardwallToolbarComponent } from './components/cardwall-toolbar/cardwall-toolbar.component';
import { CardwallListComponent } from './components/cardwall-lists-view/cardwall-list/cardwall-list.component';
import { CardwallListsViewComponent } from './components/cardwall-lists-view/cardwall-lists-view.component';
import { CreateListComponent } from './components/cardwall-lists-view/cardwall-list/create-list/create-list.component';
import { CardwallSettingsComponent } from './components/cardwall-settings/cardwall-settings.component';
import { TotalsViewComponent } from './components/cardwall-toolbar/totals-view/totals-view.component';
import { WipIndicatorComponent } from './components/wip-indicator/wip-indicator.component';
import { WipProgressBarComponent } from './components/wip-progress-bar/wip-progress-bar.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('cardwall', reducers),
    EffectsModule.forFeature(effects),
    CardDetailsModule,
    CardwallRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    SortablejsModule,
    BsDropdownModule,
    PopoverModule,
  ],
  declarations: [
    CardwallBaseComponent,
    CardBaseComponent,
    CardwallNavComponent,
    CardwallCardSearchBaseComponent,
    CardwallToolbarContainerComponent,
    CardwallToolbarComponent,
    CardwallListsBaseComponent,
    CardwallListsViewComponent,
    CardwallListComponent,
    WipIndicatorComponent,
    WipProgressBarComponent,
    CreateListComponent,
    CardwallCardsBaseComponent,
    CardViewComponent,
    CardwallCardsViewComponent,
    AddCardComponent,
    CardwallSettingsComponent,
    CardwallSettingsContainerComponent,
    CardwallResourcesViewComponent,
    AddResourceComponent,
    TotalsViewComponent,
    TotalsContainerComponent,
  ],
})
export class CardwallModule {}
