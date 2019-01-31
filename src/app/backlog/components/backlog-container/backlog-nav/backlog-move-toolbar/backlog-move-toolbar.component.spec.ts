import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { BacklogMoveToolbarComponent } from './backlog-move-toolbar.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';

describe('BacklogMoveToolbarComponent', () => {
  let component: BacklogMoveToolbarComponent;
  let fixture: ComponentFixture<BacklogMoveToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogMoveToolbarComponent, ButtonComponent],
      imports: [TooltipModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogMoveToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
