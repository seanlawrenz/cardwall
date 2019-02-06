import { Pipe, PipeTransform } from '@angular/core';

import { truncate } from 'lodash';

@Pipe({
  name: 'trimTextToLimit',
})
export class TrimTextToLimitPipe implements PipeTransform {
  transform(value: string, textLimit?: number): any {
    if (value.length > textLimit) {
      value = truncate(value, {
        length: textLimit,
        separator: ' ',
      });
    }
    return value;
  }
}
