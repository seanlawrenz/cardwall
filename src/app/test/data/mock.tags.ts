import { build, fake } from 'test-data-bot';
import { Tags } from '@app/models';

export const tagBuilder = build('tags').fields({
  name: fake(f => f.random.word()),
  tooltip: fake(f => f.random.word()),
});

export const mockTag: Tags = tagBuilder();
