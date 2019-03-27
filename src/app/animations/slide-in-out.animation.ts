import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideInOutFromBottom = trigger('slideInOut', [
  state('not-visible', style({ top: '400%' })),
  state('visible', style({ top: '0' })),
  transition('not-visible <=> visible', animate('.5s ease-in-out')),
]);
