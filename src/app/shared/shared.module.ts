import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';

// Libraries
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Pipes
import { TDXAgilePipesModule } from './pipes';

// Components
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [NotificationComponent, ButtonComponent],
  imports: [CommonModule, TDXAgilePipesModule.forRoot(), TooltipModule.forRoot()],
  exports: [ButtonComponent, NotificationComponent],
})
export class SharedModule {}
