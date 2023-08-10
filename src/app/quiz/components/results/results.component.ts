import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { QuizState } from '../../types';
import {
  selectError,
  selectIsFetching,
  selectQuiz,
  selectSecondsElapsed,
} from '../../store/quiz.reducers';
import { QuestionTypePipe } from '../../pipes/question-type.pipe';
import { CategoryPipe } from '../../pipes/category.pipe';
import { ButtonStyleDirective } from 'src/app/shared/directives/button-style.directive';
import { Router, RouterLink } from '@angular/router';
import { quizActions } from '../../store/quiz.actions';
import { Subscription, combineLatest } from 'rxjs';
import { SecondsToDatePipe } from '../../../shared/pipes/seconds-to-date.pipe';

@Component({
  selector: 'app-results',
  standalone: true,
  templateUrl: './results.component.html',
  imports: [
    CommonModule,
    QuestionTypePipe,
    CategoryPipe,
    ButtonStyleDirective,
    RouterLink,
    SecondsToDatePipe,
  ],
})
export class ResultsComponent implements OnInit, OnDestroy {
  data$ = combineLatest({
    quiz: this.store.select(selectQuiz),
    isFetching: this.store.select(selectIsFetching),
    error: this.store.select(selectError),
    time: this.store.select(selectSecondsElapsed),
  });
  quizSubscription: Subscription | undefined;

  constructor(
    private store: Store<{ quiz: QuizState }>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.quizSubscription = this.store
      .select(selectQuiz)
      .subscribe(
        res =>
          !res &&
          this.router.navigateByUrl('/quiz/create', { replaceUrl: true }),
      );
  }

  ngOnDestroy(): void {
    this.quizSubscription?.unsubscribe();
  }

  regenerateQuiz() {
    this.store.dispatch(quizActions.regenerateQuiz());
  }
}
