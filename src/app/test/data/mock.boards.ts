import { build, fake } from 'test-data-bot';
import { BoardColors, Plan } from '@app/models';

const mockBoardColorsBuilder = build('board colors').fields({
  cssClass: fake(f => f.random.word()),
  label: fake(f => f.random.word()),
  name: fake(f => f.random.word()),
});

const mockBoardColors: BoardColors[] = [
  mockBoardColorsBuilder(),
  mockBoardColorsBuilder(),
  mockBoardColorsBuilder(),
  mockBoardColorsBuilder(),
  mockBoardColorsBuilder(),
];

export const mockBoardBuilder = build('board').fields({
  colors: mockBoardColors,
  description: fake(f => f.random.words()),
  iAmProjectManager: fake(f => f.random.boolean()),
  iCanEditPlans: fake(f => f.random.boolean()),
  id: fake(f => f.random.number()),
  isAttachmentsEnabled: fake(f => f.random.boolean()),
  isFeedEnabled: fake(f => f.random.boolean()),
  isIssuesEnabled: fake(f => f.random.boolean()),
  isReportsEnabled: fake(f => f.random.boolean()),
  isResourceAssignmentEnabled: fake(f => f.random.boolean()),
  isTaskUpdateEnabled: fake(f => f.random.boolean()),
  isTemplate: fake(f => f.random.boolean()),
  isTicketToTaskEnabled: fake(f => f.random.boolean()),
  isTimeEntryEnabled: fake(f => f.random.boolean()),
  lists: [],
  myWorkTaskIDs: [],
  name: fake(f => f.random.word()),
  priorities: [],
  projectId: fake(f => f.random.number()),
  projectName: fake(f => f.random.word()),
  resources: [],
  statusTypes: fake(f => f.random.word()),
  useRemainingHours: fake(f => f.random.boolean()),
});

export const mockBoard: Plan = mockBoardBuilder();
