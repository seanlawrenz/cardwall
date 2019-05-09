import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { CardService } from '@app/app-services';
import { BacklogCardEffects } from './backlog-card.effects';
import { getActions } from '@app/test/mocks';

describe('BacklogCardEffects', () => {
  let effects: BacklogCardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BacklogCardEffects,
        { provide: Actions, useFactory: getActions },
        { provide: CardService, useValue: { buildNewCard: jest.fn() } },
        { provide: Store, useValue: { dispatch: jest.fn(), select: jest.fn() } },
      ],
    });
  });

  it('should be created', () => {
    effects = TestBed.get(BacklogCardEffects);
  });
});
