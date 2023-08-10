import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const hydrationActions = createActionGroup({
  source: 'hydration',
  events: {
    hydrate: emptyProps(),
    'hydrate success': props<{ state: any }>(),
    'hydrate failure': emptyProps(),
  },
});
