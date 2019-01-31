import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';

// Libraries
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DirectiveModule } from './directives';
import { TDXAgilePipesModule } from './pipes';

// Components
import { ButtonComponent } from './components/button/button.component';
import { FilterToolbarComponent } from './components/filter-toolbar/filter-toolbar.component';

@NgModule({
  declarations: [ButtonComponent, FilterToolbarComponent, NotificationComponent],
  imports: [CommonModule, DirectiveModule, TDXAgilePipesModule.forRoot(), TooltipModule.forRoot()],
  exports: [ButtonComponent, FilterToolbarComponent, NotificationComponent],
})
export class SharedModule {}
