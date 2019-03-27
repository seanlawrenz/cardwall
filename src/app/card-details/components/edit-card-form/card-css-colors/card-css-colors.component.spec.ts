import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { CardCssColorsComponent } from './card-css-colors.component';

describe('CardCssColorsComponent', () => {
  let component: CardCssColorsComponent;
  let fixture: ComponentFixture<CardCssColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardCssColorsComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCssColorsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.form = new FormGroup({
        cssClass: new FormControl('default'),
      });
    });
    it('should set chosen the the chose css color', () => {
      fixture.detectChanges();
      expect(component.chosen).toEqual('default');
    });
  });

  describe('updateCssClass', () => {
    beforeEach(() => {
      component.form = new FormGroup({
        cssClass: new FormControl('default'),
      });
      fixture.detectChanges();
    });

    it('should update the form and chosen', () => {
      const WARNING = 'warning';
      component.updateCssClass(WARNING);
      expect(component.cssClass.value).toEqual(WARNING);
      expect(component.chosen).toEqual(WARNING);
    });
  });
});
