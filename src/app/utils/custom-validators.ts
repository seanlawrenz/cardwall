import { ValidatorFn, FormControl } from '@angular/forms';

export const blankInputValidator: ValidatorFn = (control: FormControl) => {
  let text: string = control.value;

  text = text.trim();

  if (text === '') {
    return {
      emptyString: { value: 'Input cannot be empty' },
    };
  }
};
