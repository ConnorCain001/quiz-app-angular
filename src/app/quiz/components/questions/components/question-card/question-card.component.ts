import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizQuestion } from 'src/app/quiz/types';
import { ButtonStyleDirective } from 'src/app/shared/directives/button-style.directive';
import { ShufflePipe } from 'src/app/shared/pipes/shuffle.pipe';
import { ConcatPipe } from '../../../../../shared/pipes/concat.pipe';

@Component({
  selector: 'app-question-card',
  standalone: true,
  templateUrl: './question-card.component.html',
  imports: [CommonModule, ButtonStyleDirective, ShufflePipe, ConcatPipe],
})
export class QuestionCardComponent {
  @Input() question: QuizQuestion | undefined;
  @Output() onAnswer = new EventEmitter<boolean>();
  answered = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.question && changes['question']) this.answered = false;
  }

  answerOnClick(answer: string): void {
    this.answered = true;
    this.onAnswer.emit(answer === this.question?.correct_answer);
  }
}
