import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CardwallBaseComponent } from './container/cardwall-base.component';

const cardwallRoutes: Routes = [{ path: '', component: CardwallBaseComponent }];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(cardwallRoutes)],
  declarations: [CardwallBaseComponent],
})
export class CardwallModule {}
