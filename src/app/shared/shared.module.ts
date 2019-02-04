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
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [ButtonComponent, FilterToolbarComponent, NotificationComponent, LoadingSpinnerComponent],
  imports: [CommonModule, DirectiveModule, TDXAgilePipesModule.forRoot(), TooltipModule.forRoot()],
  exports: [ButtonComponent, FilterToolbarComponent, LoadingSpinnerComponent, NotificationComponent],
})
export class SharedModule {}
