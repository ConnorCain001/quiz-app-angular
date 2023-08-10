import { Pipe, PipeTransform } from '@angular/core';

const punctuationMarks = ['.', '!', '?', ',', ';', ':'] as const;
type Punctuation = (typeof punctuationMarks)[number];

@Pipe({
  name: 'punctuate',
  standalone: true,
})
export class PunctuatePipe implements PipeTransform {
  transform(value: string, punctuation: Punctuation = '.'): string {
    if (!value) return value;

    const hasPunctuation = punctuationMarks.includes(
      value[value.length - 1] as Punctuation,
    );
    if (hasPunctuation) value = value.slice(0, -1);
    return value + punctuation;
  }
}
