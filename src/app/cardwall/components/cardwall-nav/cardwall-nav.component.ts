import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Board } from '@app/models';

@Component({
  selector: 'td-cardwall-nav',
  templateUrl: './cardwall-nav.component.html',
  styleUrls: ['./cardwall-nav.component.scss'],
})
export class CardwallNavComponent implements OnInit, OnChanges {
  @Input() board: Board;

  @Output() editBoardRequested = new EventEmitter<Board>();
  @Output() showOptionsRequested = new EventEmitter<void>();

  editBoardForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.setUpForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.board && !changes.board.firstChange) {
      this.setUpForm();
    }
  }

  submitEditBoardName() {
    if (this.editBoardForm.valid && this.editBoardForm.dirty) {
      const { name, description } = this.editBoardForm.value;
      const updatedBoard = { ...this.board, name, description };
      this.editBoardRequested.emit(updatedBoard);
    }
  }

  showOptions() {
    this.showOptionsRequested.emit();
  }

  private setUpForm() {
    this.editBoardForm = new FormGroup({
      name: new FormControl(this.board.name, Validators.required),
      description: new FormControl(this.board.description),
    });
  }
}
