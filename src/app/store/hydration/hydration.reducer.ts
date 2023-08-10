import { Action, ActionReducer } from '@ngrx/store';
import { hydrationActions } from './hydration.actions';

function isHydrateSuccess(
  action: Action,
): action is ReturnType<typeof hydrationActions.hydrateSuccess> {
  return action.type === hydrationActions.hydrateSuccess.type;
}

export function hydrationMetaReducer(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  return function (state, action) {
    if (isHydrateSuccess(action)) return action.state;
    return reducer(state, action);
  };
}
