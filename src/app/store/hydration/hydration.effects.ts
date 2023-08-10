import { Action, Store } from '@ngrx/store';
import { hydrationActions } from './hydration.actions';
import { Injectable } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';

@Injectable()
export class hydrationEffects implements OnInitEffects {
  hydrate$ = createEffect(() =>
    this.action$.pipe(
      ofType(hydrationActions.hydrate),
      map(() => {
        const storageValue = sessionStorage.getItem('state');
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return hydrationActions.hydrateSuccess({ state });
          } catch {
            sessionStorage.removeItem('state');
          }
        }
        return hydrationActions.hydrateFailure();
      }),
    ),
  );

  serialize$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          hydrationActions.hydrateSuccess,
          hydrationActions.hydrateFailure,
        ),
        switchMap(() => this.store),
        distinctUntilChanged(),
        tap(state => sessionStorage.setItem('state', JSON.stringify(state))),
      ),
    { dispatch: false },
  );

  constructor(
    private action$: Actions,
    private store: Store,
  ) {}

  ngrxOnInitEffects(): Action {
    return hydrationActions.hydrate();
  }
}
