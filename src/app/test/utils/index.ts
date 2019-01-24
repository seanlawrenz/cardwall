import { TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { getQueriesForElement } from 'dom-testing-library';

export function render(component: any) {
  TestBed.configureTestingModule({
    declarations: [component],
    providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  const container = fixture.debugElement.nativeElement;

  return {
    container,
    ...getQueriesForElement(container),
  };
}

// Keep for reference
// test('renders a counter', () => {
//   const { getByText } = render(AppComponent);
//   const text = getByText(`Welcome to app!`);
//   expect(text).toBeTruthy();
// });
