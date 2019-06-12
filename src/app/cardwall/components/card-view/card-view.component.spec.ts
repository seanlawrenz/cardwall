import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SharedModule } from '@app/shared/shared.module';

import { CardViewComponent } from './card-view.component';
import { mockCard, mockBoard } from '@app/test/data';
import { ConfigService } from '@app/app-services';
import { mockConfigService, RouterStub } from '@app/test/mocks';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardViewComponent', () => {
  let component: CardViewComponent;
  let fixture: ComponentFixture<CardViewComponent>;
  let spy;
  let router: Router;
  let test;
  let expected;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardViewComponent],
      imports: [PopoverModule, SharedModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService }, { provide: Router, useClass: RouterStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
    component.board = mockBoard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the card details', () => {
    const url = `cardwall/project/${component.card.projectId}/board/${component.card.planId}/card/${component.card.id}`;
    router = TestBed.get(Router);
    spy = jest.spyOn(router, 'navigate');

    component.routeToEditCard();

    expect(spy).toHaveBeenCalledWith([url]);
  });

  it('should add the correct class to the card', () => {
    test = component.getCardStyle();
    expected = `tdNg-card-color-${mockCard.cssClass}`;
    expect(test).toEqual(expected);
  });

  it('should add the correct class to the card if owner is selected', () => {
    component.isOwnerSelected = true;
    test = component.getCardStyle();
    expected = `tdNg-card-color-${mockCard.cssClass} owner-selected`;
    expect(test).toEqual(expected);
  });
});
