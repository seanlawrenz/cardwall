import { build, fake } from 'test-data-bot';

export const mockAttachmentBuilder = build('attachments').fields({
  ID: fake(f => f.random.uuid()),
  createdByFirstName: fake(f => f.name.firstName()),
  createdByLastName: fake(f => f.name.lastName()),
  createdByName: fake(f => f.name.findName()),
  createdDate: fake(f => f.date.past()),
  createdEmail: fake(f => f.internet.email()),
  description: fake(f => f.random.words()),
  externalUrl: fake(f => f.internet.url()),
  folderName: fake(f => f.system.filePath()),
  isAvailable: fake(f => f.random.boolean()),
  isExternal: fake(f => f.random.boolean()),
  isOnWorkspace: fake(f => f.random.boolean()),
  lastRevisedByName: fake(f => f.name.findName()),
  modifiedByFirstName: fake(f => f.name.firstName()),
  modifiedByLastName: fake(f => f.name.lastName()),
  modifiedByName: fake(f => f.name.findName()),
  modifiedDate: fake(f => f.date.recent()),
  modifiedEmail: fake(f => f.internet.email()),
  name: fake(f => f.random.word()),
  projectID: fake(f => f.random.number()),
  referenceID: fake(f => f.random.number()),
  revision: fake(f => f.random.number()),
  size: fake(f => f.random.number()),
  sizeFriendly: fake(f => f.random.word()),
});

export const mockAttachment = mockAttachmentBuilder();
