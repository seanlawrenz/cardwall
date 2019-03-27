export enum BacklogSettingsChanges {
  WIP = 'WIP',
  SHOW_ALL = 'SHOW ALL',
  SHOW_POINTS = 'SHOW POINTS',
  SHOW_ESTIMATED_HOURS = 'SHOW ESTIMATED HOURS',
  SHOW_NONE = 'SHOW NONE',
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
