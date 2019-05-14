import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardwallListsViewComponent } from './cardwall-lists-view.component';
import { mockBoard, mockList } from '@app/test/data';

describe('CardwallListsViewComponent', () => {
  let component: CardwallListsViewComponent;
  let fixture: ComponentFixture<CardwallListsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardwallListsViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallListsViewComponent);
    component = fixture.componentInstance;
    component.board = mockBoard;
    component.lists = [mockList];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
