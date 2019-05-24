import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CardService } from '@app/app-services';
import { List } from '@app/models';

@Component({
  selector: 'td-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  @Input() list: List;

  @Output() cancelNewCard = new EventEmitter<void>();

  newCardForm: FormGroup;

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.setUpForm();
  }

  onSubmit() {
    if (this.newCardForm.valid) {
      const {
        value: { title },
      } = this.newCardForm;
      this.cardService.buildNewCard(this.list, title).subscribe(info => console.log(info));
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
