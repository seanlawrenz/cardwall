import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcDate',
})
export class UtcDatePipe implements PipeTransform {
  transform(value: string) {
    if (!value) {
      return '';
    }

    const dateValue = new Date(value);

    const dateWithNoTimeZone = new Date(
      dateValue.getUTCFullYear(),
      dateValue.getUTCMonth(),
      dateValue.getUTCDate(),
      dateValue.getUTCHours(),
      dateValue.getUTCMinutes(),
      dateValue.getUTCSeconds(),
    );

    return dateWithNoTimeZone;
  }
}
