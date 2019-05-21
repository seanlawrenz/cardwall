import { NgModule } from '@angular/core';

import { DisableControlDirective } from './disable-inputs.directive';
import { SortableTableDirective } from './sortable-table.directive';
import { TdTooltipDirective } from './tooltip-directive';
import { UtcDatePipe } from './utcDate.pipe';

@NgModule({
  declarations: [DisableControlDirective, SortableTableDirective, TdTooltipDirective, UtcDatePipe],
  exports: [DisableControlDirective, SortableTableDirective, TdTooltipDirective, UtcDatePipe],
})
export class DirectiveModule {}
