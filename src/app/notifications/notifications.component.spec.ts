import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { NotificationComponent } from './notification/notification.component';
import { Store } from '@ngrx/store';
import { EscapeHtmlPipe } from '@app/shared/pipes/keep-html.pipe';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsComponent, NotificationComponent, EscapeHtmlPipe],
      providers: [{ provide: Store, useValue: { pipe: jest.fn(), dispatch: jest.fn(), select: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
