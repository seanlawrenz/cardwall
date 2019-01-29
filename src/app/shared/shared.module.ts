import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';

import { TDXAgilePipesModule } from './pipes';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, TDXAgilePipesModule.forRoot()],
  exports: [NotificationComponent],
})
export class SharedModule {}
