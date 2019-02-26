import { Injectable } from '@angular/core';
import { Card } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  showCardDetails(card: Card) {
    console.log('show card details clicked for', card);
  }
}
