import { Route } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ResultsComponent } from './components/results/results.component';
import { provideState } from '@ngrx/store';
import { quizFeatureKey, quizReducer } from './store/quiz.reducers';
import * as quizEffects from './store/quiz.effects';
import { provideEffects } from '@ngrx/effects';
import { LayoutComponent } from './components/layout/layout.component';

export const quizRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    providers: [
      provideState(quizFeatureKey, quizReducer),
      provideEffects(quizEffects),
    ],
    children: [
      { path: '', redirectTo: 'create', pathMatch: 'full' },
      { path: 'create', component: CreateComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'results', component: ResultsComponent },
    ],
  },
];
