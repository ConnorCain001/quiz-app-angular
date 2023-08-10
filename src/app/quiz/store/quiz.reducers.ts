import { createFeature, createReducer, on } from '@ngrx/store';
import { QuizState } from '../types';
import { quizActions } from './quiz.actions';

const initialState: QuizState = {
  quiz: null,
  isFetching: false,
  error: undefined,
  currentIndex: 0,
  secondsElapsed: 0,
};

const quizFeature = createFeature({
  name: 'quiz',
  reducer: createReducer(
    initialState,
    on(quizActions.create, state => ({
      ...state,
      error: undefined,
      currentIndex: 0,
      isFetching: true,
    })),
    on(quizActions.createSuccess, (state, { quiz }) => ({
      ...state,
      quiz,
      secondsElapsed: 0,
      isFetching: false,
    })),
    on(quizActions.createFailure, (state, { error }) => ({
      ...state,
      error,
      isFetching: false,
    })),
    on(quizActions.answerQuestion, (state, { isCorrect }) => {
      if (!state.quiz) return initialState;
      const score = state.quiz.score + (isCorrect ? 1 : 0);
      const currentIndex = state.currentIndex + 1;
      return { ...state, quiz: { ...state.quiz, score }, currentIndex };
    }),
    on(quizActions.clearQuiz, () => initialState),
    on(quizActions.incrementTimer, state => {
      const secondsElapsed = state.secondsElapsed + 1;
      return { ...state, secondsElapsed };
    }),
  ),
});

export const {
  name: quizFeatureKey,
  reducer: quizReducer,
  selectQuizState,
  selectIsFetching,
  selectQuiz,
  selectError,
  selectCurrentIndex,
  selectSecondsElapsed,
} = quizFeature;
