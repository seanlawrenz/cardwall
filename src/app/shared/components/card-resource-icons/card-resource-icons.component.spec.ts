import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResourceIconsComponent } from './card-resource-icons.component';
import { ProfileImageComponent } from '../profile-image/profile-image.component';
import { TdTooltipDirective } from '@app/shared/directives/tooltip-directive';
import { mockCard } from '@app/test/data';
import { AppService } from '@app/app-services';

describe('CardResourceIconsComponent', () => {
  let component: CardResourceIconsComponent;
  let fixture: ComponentFixture<CardResourceIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardResourceIconsComponent, ProfileImageComponent, TdTooltipDirective],
      providers: [{ provide: AppService, useValue: { showCardDetails: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardResourceIconsComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
