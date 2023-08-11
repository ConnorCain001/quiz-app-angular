import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  selectCurrentIndex,
  selectSecondsElapsed,
  selectQuiz,
} from '../../store/quiz.reducers';
import { Store } from '@ngrx/store';
import { QuizState } from '../../types';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { Subscription, combineLatest, timer } from 'rxjs';
import { quizActions } from '../../store/quiz.actions';
import { Router } from '@angular/router';
import { SecondsToDatePipe } from '../../../shared/pipes/seconds-to-date.pipe';

@Component({
  selector: 'app-questions',
  standalone: true,
  templateUrl: './questions.component.html',
  imports: [CommonModule, QuestionCardComponent, SecondsToDatePipe],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  data$ = combineLatest({
    quiz: this.store.select(selectQuiz),
    currentIndex: this.store.select(selectCurrentIndex),
    time: this.store.select(selectSecondsElapsed),
  });
  quizSubscription$: Subscription | undefined;
  intervalSubscription$: Subscription | undefined;
  wasCorrect = false;

  constructor(
    private store: Store<{ quiz: QuizState }>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // TODO: Handle quiz taking longer than 1 hour
    this.store.dispatch(quizActions.startTimer());
    this.quizSubscription$ = this.store
      .select(selectQuiz)
      .subscribe(
        res =>
          !res &&
          this.router.navigateByUrl('/quiz/create', { replaceUrl: true }),
      );
  }

  ngOnDestroy(): void {
    this.store.dispatch(quizActions.stopTimer());
    this.quizSubscription$?.unsubscribe();
    this.intervalSubscription$?.unsubscribe();
  }

  answerQuestion(isCorrect: boolean) {
    this.wasCorrect = isCorrect;
    this.intervalSubscription$ = timer(1000).subscribe(() => {
      this.store.dispatch(quizActions.answerQuestion({ isCorrect }));
      this.wasCorrect = false;
    });
  }
}
