import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardwallBaseComponent } from './container/cardwall-base.component';

export const cardwallRoutes: Routes = [{ path: '', component: CardwallBaseComponent, runGuardsAndResolvers: 'always' }];

@NgModule({
  imports: [RouterModule.forChild(cardwallRoutes)],
})
export class CardwallRoutingModule {}
