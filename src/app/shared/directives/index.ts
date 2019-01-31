import { NgModule } from '@angular/core';
import { TdTooltipDirective } from './tooltip-directive';

@NgModule({
  declarations: [TdTooltipDirective],
  exports: [TdTooltipDirective],
})
export class DirectiveModule {}
