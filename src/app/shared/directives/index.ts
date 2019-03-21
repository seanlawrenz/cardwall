import { NgModule } from '@angular/core';

import { DisableControlDirective } from './disable-inputs.directive';
import { TdTooltipDirective } from './tooltip-directive';

@NgModule({
  declarations: [DisableControlDirective, TdTooltipDirective],
  exports: [DisableControlDirective, TdTooltipDirective],
})
export class DirectiveModule {}
