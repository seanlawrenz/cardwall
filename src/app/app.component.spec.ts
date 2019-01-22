import { TestBed, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { getQueriesForElement } from 'dom-testing-library';

import { AppComponent } from './app.component';

function render(component: any) {
  TestBed.configureTestingModule({
    declarations: [component],
    providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  const container = fixture.debugElement.nativeElement;

  return getQueriesForElement(container);
}

test('renders a counter', () => {
  const { getByText } = render(AppComponent);
  const text = getByText(`Welcome to app!`);
  expect(text).toBeTruthy();
});
