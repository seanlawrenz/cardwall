import { build, fake } from 'test-data-bot';

export const mockProjectBuilder = build('projects').fields({
  ID: fake(f => f.random.number()),
  name: fake(f => f.random.word()),
});

export const mockProject1 = mockProjectBuilder();
export const mockProject2 = mockProjectBuilder();
export const mockProject3 = mockProjectBuilder();
export const mockProject4 = mockProjectBuilder();
export const mockProject5 = mockProjectBuilder();
