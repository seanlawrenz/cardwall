import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { fromRoot } from '@app/store';
import * as cardActions from '@app/store/actions/card.actions';

import { List, CardOperationInfo } from '@app/models';
import { CardService } from '@app/app-services';

@Component({
  selector: 'td-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  @Input() list: List;

  @Output() cancelNewCard = new EventEmitter<void>();

  newCardForm: FormGroup;

  constructor(private cardService: CardService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.setUpForm();
  }

  onSubmit() {
    if (this.newCardForm.valid) {
      const {
        value: { title },
      } = this.newCardForm;
      this.cardService.buildNewCard(this.list, title).subscribe((info: CardOperationInfo) => {
        this.store.dispatch(new cardActions.CardCreateFromServer(info));
        this.setUpForm();
      });
    }
  }

  cancel() {
    this.cancelNewCard.emit();
  }

  private setUpForm() {
    this.newCardForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }
}
