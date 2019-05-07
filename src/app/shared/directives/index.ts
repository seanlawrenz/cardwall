import { NgModule } from '@angular/core';

import { DisableControlDirective } from './disable-inputs.directive';
import { SortableTableDirective } from './sortable-table.directive';
import { TdTooltipDirective } from './tooltip-directive';

@NgModule({
  declarations: [DisableControlDirective, SortableTableDirective, TdTooltipDirective],
  exports: [DisableControlDirective, SortableTableDirective, TdTooltipDirective],
})
export class DirectiveModule {}
