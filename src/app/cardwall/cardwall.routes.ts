import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardwallBaseComponent } from './container/cardwall-base.component';
import { CardBaseComponent } from './container/card-base/card-base.component';

export const cardwallRoutes: Routes = [
  {
    path: '',
    component: CardwallBaseComponent,
    runGuardsAndResolvers: 'always',
    children: [{ path: 'card/:cardId', component: CardBaseComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cardwallRoutes)],
})
export class CardwallRoutingModule {}
