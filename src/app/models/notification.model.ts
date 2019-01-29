export class Notification {
  public Title: string;
  public Description: string;
  public DismissAfterSeconds: number;
  public Type: NotificationType;
  public OnClick(): void {}

  constructor(
    title: string,
    description: string,
    type: NotificationType = NotificationType.Info,
    dismissAfterSeconds: number = 0,
    onClick: () => void = null,
  ) {
    this.Title = title;
    this.Description = description;

    this.Type = type;
    this.DismissAfterSeconds = dismissAfterSeconds;

    this.OnClick = onClick;
  }
}

export enum NotificationType {
  Success,
  Info,
  Warning,
  Danger,
}
