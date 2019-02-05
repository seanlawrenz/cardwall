import { build, fake } from 'test-data-bot';

export const resourceBuilder = build('resource').fields({
  email: fake(f => f.internet.email()),
  firstName: fake(f => f.name.firstName()),
  lastName: fake(f => f.name.lastName()),
  name: fake(f => f.name.findName()),
  permissions: '',
  profilePicturePath: fake(f => f.image.imageUrl()),
  referenceId: fake(f => f.random.uuid()),
  uid: fake(f => f.random.uuid()),
  isPlaceholder: fake(f => f.random.boolean()),
});

export const mockResource = resourceBuilder();
