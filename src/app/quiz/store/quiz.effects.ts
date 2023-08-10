import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuizService } from '../quiz.service';
import { quizActions } from './quiz.actions';
import {
  catchError,
  interval,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuizState } from '../types';
import { selectQuizState } from './quiz.reducers';

export const createQuizEffect = createEffect(
  (actions$ = inject(Actions), quizService = inject(QuizService)) => {
    return actions$.pipe(
      ofType(quizActions.create),
      switchMap(({ request }) =>
        quizService.createQuiz(request).pipe(
          map(quiz =>
            quiz.questions.length === request.amount
              ? quizActions.createSuccess({ quiz })
              : quizActions.createFailure({
                  error:
                    'Failed to generate quiz: Not enough questions for your quiz',
                }),
          ),
        ),
      ),
      catchError(() =>
        of(quizActions.createFailure({ error: 'An unknown error occurred' })),
      ),
    );
  },
  { functional: true },
);

export const updateQuizTimeEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(quizActions.startTimer),
      switchMap(() =>
        interval(1000).pipe(
          map(() => quizActions.incrementTimer()),
          takeUntil(actions$.pipe(ofType(quizActions.stopTimer))),
        ),
      ),
    );
  },
  { functional: true },
);

export const regenerateQuizEffect = createEffect(
  (actions$ = inject(Actions), store = inject(Store<{ quiz: QuizState }>)) => {
    return actions$.pipe(
      ofType(quizActions.regenerateQuiz),
      withLatestFrom(store.select(selectQuizState)),
      map(([_, quizState]) => {
        if (!quizState.quiz)
          return quizActions.createFailure({
            error: 'Failed to regenerate quiz: No quiz found',
          });
        const { amount, category, difficulty, type } = quizState.quiz;
        const request = { amount, category, difficulty, type };
        return quizActions.create({
          request,
        });
      }),
    );
  },
  { functional: true },
);

export const redirectAfterQuizComplete = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    store = inject(Store<{ quiz: QuizState }>),
  ) => {
    return actions$.pipe(
      ofType(quizActions.answerQuestion),
      withLatestFrom(store.select(selectQuizState)),
      map(([_, quizState]) => {
        if (quizState.currentIndex === quizState.quiz?.amount)
          router.navigateByUrl('/quiz/results', { replaceUrl: true });
      }),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);

export const redirectAfterCreateQuizEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(quizActions.createSuccess),
      tap(() => router.navigateByUrl('/quiz/questions')),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);
