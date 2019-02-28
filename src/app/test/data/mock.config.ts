import { build, fake } from 'test-data-bot';

export const configBuilder = build('config').fields({
  UID: fake(f => f.random.uuid()),
  BEID: fake(f => f.random.word()),
  BEIDInt: fake(f => f.random.number()),
  BearerAuthToken: fake(f => f.random.uuid()),
  BasePath: fake(f => f.internet.url()),
  UserProfilePathBase: fake(f => f.internet.url()),
  ApiBasePath: fake(f => f.internet.url()),
  TDNextBasePath: fake(f => f.internet.url()),
  SignalRBasePath: fake(f => f.internet.url()),
  CanUpdateTasks: fake(f => f.random.boolean()),
  CanUpdateMyTasksOnly: fake(f => f.random.boolean()),
  CanAddTasks: fake(f => f.random.boolean()),
  CanDeleteTasks: fake(f => f.random.boolean()),
  CanEditTasks: fake(f => f.random.boolean()),
  CanAddPlans: fake(f => f.random.boolean()),
  CanDeletePlans: fake(f => f.random.boolean()),
  CanEditPlans: fake(f => f.random.boolean()),
  CanAddIssues: fake(f => f.random.boolean()),
  CanDeleteIssues: fake(f => f.random.boolean()),
  TaskDetailBasePath: fake(f => f.internet.url()),
  TaskAlertsBasePath: fake(f => f.internet.url()),
  TaskResourcesBasePath: fake(f => f.internet.url()),
  TaskIssuesBasePath: fake(f => f.internet.url()),
  TaskTimeTypesBasePath: fake(f => f.internet.url()),
  TaskWorkBasePath: fake(f => f.internet.url()),
  AppsBasePath: fake(f => f.internet.url()),
  TaskUpdateBasePath: fake(f => f.internet.url()),
  AddTicketPath: fake(f => f.internet.url()),
  PlanDetailsPath: fake(f => f.internet.url()),
  PlanFeedPath: fake(f => f.internet.url()),
  PlanResourceAllocationViewPath: fake(f => f.internet.url()),
  HomePath: fake(f => f.internet.url()),
  IsDebug: fake(f => f.random.boolean()),
  IsSourceControlEnabled: fake(f => f.random.boolean()),
  SignalRHubName: fake(f => f.random.word()),
  WorkdaysPerWeek: 5,
  HoursPerDay: 8,
  PlanCustomViewPath: fake(f => f.internet.url()),
  PrintViewPath: fake(f => f.internet.url()),
  BurndownReportPath: fake(f => f.internet.url()),
  AddExternalRelationshipPath: fake(f => f.internet.url()),
  ExportPath: fake(f => f.internet.url()),
  ReferrerUrl: fake(f => f.internet.url()),
  PlanPrioritizationViewPath: fake(f => f.internet.url()),
  PlanBackupsViewPath: fake(f => f.internet.url()),
  DateFormatString: fake(f => f.random.word()),
  DateFormatStringNoDayOfWeek: fake(f => f.random.word()),
  IsElectron: fake(f => f.random.boolean()),
  IsTDNext: fake(f => f.random.boolean()),
  HasAnalysis: fake(f => f.random.boolean()),
});

export const mockConfig = configBuilder();