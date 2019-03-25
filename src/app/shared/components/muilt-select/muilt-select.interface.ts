import { Observable } from 'rxjs';

export type TypeaheadSuggestions = string[] | Object[] | Observable<string>[] | Observable<Object[]>;

export interface TypeaheadSettings {
  typeDelay?: number;
  suggestionsLimit?: number;
  noMatchesText?: string;
  createOnNoMatchesText?: string;
  buttonClass?: string;
  tagClass?: string;
  tagRemoveIconClass?: string;

  dropDownMenuClass?: string;
  dropDownMenuExpandedClass?: string;
  dropDownMenuItemClass?: string;
  dropDownToggleClass?: string;
  dashCase: boolean;
}
