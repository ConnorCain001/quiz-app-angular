import { Pipe, PipeTransform } from '@angular/core';
import { QuestionType } from '../types';

@Pipe({
  name: 'questionType',
  standalone: true,
})
export class QuestionTypePipe implements PipeTransform {
  transform(type: QuestionType): string {
    switch (type) {
      case 'boolean':
        return 'true / false';
      case 'multiple':
        return 'multiple choice';
      default:
        return type;
    }
  }
}
