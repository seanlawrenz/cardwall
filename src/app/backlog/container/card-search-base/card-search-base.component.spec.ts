import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSearchBaseComponent } from './card-search-base.component';

describe('CardSearchBaseComponent', () => {
  let component: CardSearchBaseComponent;
  let fixture: ComponentFixture<CardSearchBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSearchBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSearchBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
