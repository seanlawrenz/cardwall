import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandCollapseGlyphComponent } from './expand-collapse-glyph.component';

describe('ExpandCollapseGlyphComponent', () => {
  let component: ExpandCollapseGlyphComponent;
  let fixture: ComponentFixture<ExpandCollapseGlyphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandCollapseGlyphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandCollapseGlyphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
