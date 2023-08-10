import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToDate',
  standalone: true,
})
export class SecondsToDatePipe implements PipeTransform {
  transform(value: number): Date {
    return new Date(value * 1000);
  }
}
