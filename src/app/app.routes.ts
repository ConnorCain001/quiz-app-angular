import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'quiz', pathMatch: 'full' },
  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.routes').then(m => m.quizRoutes),
  },
];
