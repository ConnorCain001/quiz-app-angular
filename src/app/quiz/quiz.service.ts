import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateQuizProps, Quiz, QuizQuestion } from './types';
import { Observable, map } from 'rxjs';

const buildQueryString = (props: CreateQuizProps) =>
  `https://opentdb.com/api.php?${Object.entries(props)
    .filter(([_, value]) => !!value && value !== 'any')
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  createQuiz(props: CreateQuizProps): Observable<Quiz> {
    return this.http
      .get<{ response_code: number; results: QuizQuestion[] }>(
        buildQueryString(props)
      )
      .pipe(
        map(({ results: questions }) => ({ ...props, questions, score: 0 }))
      );
  }
}
