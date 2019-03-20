import { Card, CardColors } from '@app/models';

export const getCardColor = (card: Card): string => {
  let color;
  switch (card.cssClass) {
    case CardColors.DEFAULT:
      color = 'default';
      break;

    case CardColors.PRIMARY:
      color = 'primary';
      break;

    case CardColors.SUCCESS:
      color = 'success';
      break;

    case CardColors.INFO:
      color = 'info';
      break;

    case CardColors.WARNING:
      color = 'warning';
      break;

    case CardColors.DANGER:
      color = 'danger';
      break;

    default:
      color = 'default';
  }
  return `tdNg-card-color-${color}`;
};
