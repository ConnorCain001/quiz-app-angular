import { UnionOfKeys } from '../shared/types';
import categories from './categories';

export const difficulties = ['any', 'easy', 'medium', 'hard'] as const;
export type Difficulty = (typeof difficulties)[number];

export const questionTypes = ['any', 'multiple', 'boolean'] as const;
export type QuestionType = (typeof questionTypes)[number];

export type Category = UnionOfKeys<typeof categories>;

export type CreateQuizProps = {
  amount: number;
  category: Category;
  difficulty: Difficulty;
  type: QuestionType;
};

export type QuizQuestion = {
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type Quiz = CreateQuizProps & {
  questions: QuizQuestion[];
  score: number;
};

export type QuizState = {
  quiz: Quiz | null;
  isFetching: boolean;
  error: string | undefined;
  currentIndex: number;
  secondsElapsed: number;
};
