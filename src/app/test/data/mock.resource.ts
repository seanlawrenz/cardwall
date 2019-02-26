import { build, fake } from 'test-data-bot';
import { Resources } from '@app/models';

export const resourceBuilder = build('resource').fields({
  email: fake(f => f.internet.email()),
  firstName: fake(f => f.name.firstName()),
  lastName: fake(f => f.name.lastName()),
  name: fake(f => f.name.findName()),
  permissions: '',
  profilePicturePath: 'User/ViewProfileImage.ashx?FileName=',
  referenceId: fake(f => f.random.uuid()),
  uid: fake(f => f.random.uuid()),
  isPlaceholder: fake(f => f.random.boolean()),
});

export const mockResource: Resources = resourceBuilder();
