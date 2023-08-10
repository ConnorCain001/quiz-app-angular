import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  Category,
  CreateQuizProps,
  Difficulty,
  QuestionType,
  QuizState,
  difficulties,
  questionTypes,
} from '../../types';
import { selectError, selectIsFetching } from '../../store/quiz.reducers';
import { quizActions } from '../../store/quiz.actions';
import { combineLatest } from 'rxjs';
import categories from '../../categories';
import { QuestionTypePipe } from '../../pipes/question-type.pipe';
import { ButtonStyleDirective } from 'src/app/shared/directives/button-style.directive';
import { FormErrorComponent } from 'src/app/shared/components/form-error/form-error.component';

const amountValidators = [
  Validators.required,
  Validators.min(1),
  Validators.max(50),
  Validators.pattern('^[0-9]*$'),
];

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuestionTypePipe,
    ButtonStyleDirective,
    FormErrorComponent,
  ],
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  categories = categories;
  difficulties = difficulties;
  types = questionTypes;
  form = this.fb.group({
    amount: [10, amountValidators],
    category: this.fb.control<Category>(0),
    difficulty: this.fb.control<Difficulty>('any'),
    type: this.fb.control<QuestionType>('any'),
  });
  data$ = combineLatest({
    isFetching: this.store.select(selectIsFetching),
    error: this.store.select(selectError),
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<{ quiz: QuizState }>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(quizActions.clearQuiz());
  }

  createQuiz() {
    if (this.form.invalid) return;
    const request: CreateQuizProps = this.form.getRawValue();
    this.store.dispatch(quizActions.create({ request }));
  }
}
