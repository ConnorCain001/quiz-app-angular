import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concat',
  standalone: true,
})
export class ConcatPipe implements PipeTransform {
  transform(arrays: any[][]): any[] {
    if (!arrays?.length || !Array.isArray(arrays)) return [];
    return arrays.reduce(
      (result, currentArray) => result.concat(currentArray),
      [],
    );
  }
}
