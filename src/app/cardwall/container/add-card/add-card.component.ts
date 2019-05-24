import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'td-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  @Output() cancelNewCard = new EventEmitter<void>();

  newCardForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.setUpForm();
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
