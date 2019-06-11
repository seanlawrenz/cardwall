import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CardwallToolbarComponent } from './cardwall-toolbar.component';
import { mockBoard, mockResource } from '@app/test/data';

describe('CardwallToolbarComponent', () => {
  let component: CardwallToolbarComponent;
  let fixture: ComponentFixture<CardwallToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallToolbarComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallToolbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get the resources from the board', () => {
      const boardWithResources = { ...mockBoard, resources: [mockResource] };
      component.board = boardWithResources;

      fixture.detectChanges();

      expect(component.resources).toEqual(boardWithResources.resources);
    });
  });
});
