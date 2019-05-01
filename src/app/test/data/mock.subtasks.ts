import { build, fake } from 'test-data-bot';
import { Subtask } from '@app/models';

export const subtasksBuilder = build('subtasks').fields({
  ID: fake(f => f.random.number()),
  title: fake(f => f.random.word()),
  percentCompleteWhole: 0,
  order: 0,
});

export const mockSubtask: Subtask = subtasksBuilder();
