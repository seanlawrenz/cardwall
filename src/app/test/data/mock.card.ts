import { build, fake } from 'test-data-bot';

export const mockCardBuilder = build('card').fields({
  attachmentsCount: fake(f => f.random.number()),
  cssClass: fake(f => f.random.word()),
  description: fake(f => f.random.words()),
  endDate: fake(f => f.date.future()),
  estimatedHours: fake(f => f.random.number()),
  id: fake(f => f.random.number()),
  isStory: fake(f => f.random.boolean()),
  issuesCount: fake(f => f.random.number()),
  listId: fake(f => f.random.number()),
  name: fake(f => f.random.word()),
  openIssuesCount: fake(f => f.random.number()),
  openSubtasksCount: fake(f => f.random.number()),
  order: fake(f => f.random.number()),
  owners: [],
  tags: [],
  percentComplete: fake(f => f.random.number()),
  planId: fake(f => f.random.number()),
  priorityId: fake(f => f.random.number()),
  projectId: fake(f => f.random.number()),
  remainingHours: fake(f => f.random.number()),
  startDate: fake(f => f.date.past()),
  storyPoints: fake(f => f.random.number()),
  subtasksCount: fake(f => f.random.number()),
  ticketAppID: fake(f => f.random.number()),
  ticketID: fake(f => f.random.number()),
  valuePoints: fake(f => f.random.number()),
  version: fake(f => f.random.word()),
  codeCount: fake(f => f.random.number()),
});

export const mockCard = mockCardBuilder();
