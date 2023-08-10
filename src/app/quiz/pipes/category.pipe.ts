import { Pipe, PipeTransform } from '@angular/core';
import categories from '../categories';
import { Category } from '../types';

@Pipe({
  name: 'category',
  standalone: true,
})
export class CategoryPipe implements PipeTransform {
  transform(category: Category): unknown {
    return categories[category];
  }
}
