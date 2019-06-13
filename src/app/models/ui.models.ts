export enum BacklogSettingsChanges {
  WIP = 'WIP',
  SHOW_ALL = 'SHOW ALL',
  SHOW_POINTS = 'SHOW POINTS',
  SHOW_ESTIMATED_HOURS = 'SHOW ESTIMATED HOURS',
  SHOW_NONE = 'SHOW NONE',
}

export enum CardwallSettingChanges {
  SHOW_INACTIVE_LISTS = 'SHOW INACTIVE LISTS',
  SHOW_ARCHIVED_CARDS = 'SHOW ARCHIVED CARDS',
}

// There is a disconnect between the old backlog enum and the newer "better" string type.
// We'll have to juggle them for some time.
export enum EstimateVisibilityMode {
  all,
  storyPoints,
  estimatedHours,
  none,
}

export enum ViewVisibility {
  VISIBLE = 'visible',
  NOT_VISIBLE = 'not-visible',
}

export enum BrowserNotificationPreferences {
  NONE = 'none',
  MY_ITEMS = 'myItems',
  ALL = 'allItems',
}
