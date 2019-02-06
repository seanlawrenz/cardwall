import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogListComponent } from './backlog-list.component';
import { ExpandCollapseGlyphComponent } from '@app/shared/components/expand-collapse-glyph/expand-collapse-glyph.component';
import { TrimTextToLimitPipe } from '@app/shared/pipes/trim-text-to-limit.pipe';

describe('BacklogListComponent', () => {
  let component: BacklogListComponent;
  let fixture: ComponentFixture<BacklogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogListComponent, ExpandCollapseGlyphComponent, TrimTextToLimitPipe],
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
