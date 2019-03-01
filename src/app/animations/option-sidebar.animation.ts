import { trigger, state, style, transition, animate } from '@angular/animations';

/** Animation sliding from right to left for the option side bar */
export const optionsSidebar = trigger('optionsSidebar', [
  state('not-visible', style({ left: '400%', zIndex: '-1' })),
  state('visible', style({ left: 0, zIndex: '9999' })),
  transition('not-visible <=> visible', animate('.5s ease-in-out')),
]);
