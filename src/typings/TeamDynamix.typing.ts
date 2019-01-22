interface TeamDynamixConfig {
  IsDebug: boolean;
  BearerAuthToken: string;
  UID: string;
  BEID: string;
  BEIDInt: number;
  BasePath: string;
  UserProfilePathBase: string;
  ApiBasePath: string;
  SignalRBasePath: string;
  TDNextBasePath: string;
  TaskDetailBasePath: string;
  TaskAlertsBasePath: string;
  TaskResourcesBasePath: string;
  TaskIssuesBasePath: string;
  TaskTimeTypesBasePath: string;
  TaskWorkBasePath: string;
  TaskUpdateBasePath: string;
  AddTicketPath: string;
  PlanDetailsPath: string;
  PlanFeedPath: string;
  PlanResourceAllocationViewPath: string;
  BurndownReportPath: string;
  AppsBasePath: string;
  HomePath: string;
  IsSourceControlEnabled: boolean;

  CanUpdateTasks: boolean;
  CanUpdateMyTasksOnly: boolean;
  CanAddTasks: boolean;
  CanDeleteTasks: boolean;
  CanEditTasks: boolean;
  CanAddIssues: boolean;
  CanDeleteIssues: boolean;
  CanAddPlans: boolean;
  CanDeletePlans: boolean;
  CanEditPlans: boolean;
  HasAnalysis: boolean;
  IsTDNext: boolean;
  KillSwitch: boolean;
}

interface TeamDynamix {
  Config: TeamDynamixConfig;
  HotService: any;
  BasePath?: string;
  openWin(url: string, width?: number, height?: number, name?: number, scrollbars?: string);
  openWinReturn(url: string, width?: number, height?: number, name?: number, scrollbars?: string): Window;

  openFullScreen(url: string, name?: string);
  openFullScreenReturn(url: string, name?: string): string;

  TDSerialize(SortableDiv: any): string;

  refreshIframe(frameId: number);

  stopPropogation(e: any);

  tdPrint(elementsToPrint: any, printTimeout?: number);
  tdDivPrint(elementsToPrint: any, printTimeout?: number);

  escapejQuerySelector(selector: string): string;

  setCaretPosition(elemId: string, caretPos: number);
  getCaretPosition(element: any);

  setCookie(cookieProps: Object);
  createCookie(name: string, value?: string, days?: number, path?: string);
  readCookie(name: string): string;
  eraseCookie(name: string);

  linkifyText(text: string): string;

  toggleMoreLess(itm: any);

  toggleHelp(itm: any);
  showHideAllHelp(show: boolean, context: any);
  showHideAllHelpBootstrap(show: boolean, context: any);

  openEmailLink(emailAddr: string);

  initInlineHelp();
  initBootstrapHelp();

  generateProfileImageHtml(options: any);
}
