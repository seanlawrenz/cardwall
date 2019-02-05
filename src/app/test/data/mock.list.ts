import { build, fake } from 'test-data-bot';

export const mockListBuilder = build('list').fields({
  active: fake(f => f.random.boolean()),
  cards: [],
  description: fake(f => f.random.words()),
  id: fake(f => f.random.number()),
  limits: [],
  order: fake(f => f.random.number()),
  percentComplete: fake(f => f.random.number()),
  planId: fake(f => f.random.number()),
  projectId: fake(f => f.random.number()),
  statusTypeId: fake(f => f.random.number()),
  title: fake(f => f.random.word()),
});

export const mockList = mockListBuilder();
