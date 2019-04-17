import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

import { BacklogListComponent } from './backlog-list.component';
import { ExpandCollapseGlyphComponent } from '@app/shared/components/expand-collapse-glyph/expand-collapse-glyph.component';
import { TrimTextToLimitPipe } from '@app/shared/pipes/trim-text-to-limit.pipe';

import { ListService } from '@app/app-services';

describe('BacklogListComponent', () => {
  let component: BacklogListComponent;
  let fixture: ComponentFixture<BacklogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogListComponent, ExpandCollapseGlyphComponent, TrimTextToLimitPipe],
      providers: [
        { provide: Store, useValue: { pipe: jest.fn(), select: jest.fn() } },
        { provide: ListService, useValue: { ticketToTaskUrl: jest.fn(() => '') } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
