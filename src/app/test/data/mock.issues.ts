import { build, fake } from 'test-data-bot';
import { resourceBuilder } from './mock.resource';
import { IssueStatusType, Issue } from '@app/models';

export const mockIssueBuilder = build('issue').fields({
  ID: fake(f => f.random.number()),
  title: fake(f => f.random.word()),
  responsibleUID: fake(f => f.random.uuid()),
  responsibleFullName: fake(f => f.name.findName()),
  statusName: fake(f => f.random.word()),
  statusTypeID: IssueStatusType.new,
  priorityName: 'High',
  categoryName: fake(f => f.random.word()),
  modifiedDate: fake(f => f.date.recent()),
});

export const mockIssue: Issue = mockIssueBuilder();
