import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ConfigService, SignalRService } from './app-services';
import { mockConfigService } from './test/mocks';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let signalRService: SignalRService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      providers: [SignalRService, { provide: ConfigService, useValue: mockConfigService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    signalRService = TestBed.get(SignalRService);
  });

  it('should initialize signalR', () => {
    const spy = spyOn(signalRService, 'initialize');
    fixture.detectChanges();
    async(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
