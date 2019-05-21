import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SharedModule } from '@app/shared/shared.module';

import { CardViewComponent } from './card-view.component';
import { mockCard, mockBoard } from '@app/test/data';
import { ConfigService } from '@app/app-services';
import { mockConfigService } from '@app/test/mocks';

describe('CardViewComponent', () => {
  let component: CardViewComponent;
  let fixture: ComponentFixture<CardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardViewComponent],
      imports: [PopoverModule, SharedModule],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
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
});
