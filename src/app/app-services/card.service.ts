import { Injectable } from '@angular/core';
import { Card } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  dragCard: Card;
  constructor() {}
}
