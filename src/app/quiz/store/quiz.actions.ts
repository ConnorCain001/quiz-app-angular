import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateQuizProps, Quiz } from '../types';

export const quizActions = createActionGroup({
  source: 'quiz',
  events: {
    create: props<{ request: CreateQuizProps }>(),
    'create success': props<{ quiz: Quiz }>(),
    'create failure': props<{ error: string }>(),
    'answer question': props<{ isCorrect: boolean }>(),
    'regenerate quiz': emptyProps(),
    'clear quiz': emptyProps(),
    'start timer': emptyProps(),
    'stop timer': emptyProps(),
    'increment timer': emptyProps(),
  },
});
