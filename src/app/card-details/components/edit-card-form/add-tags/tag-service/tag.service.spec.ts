import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';
import { SignalRService, NotificationService } from '@app/app-services';
import { mockCard } from '@app/test/data';
import { fake } from 'test-data-bot';
import { of } from 'rxjs';
import { SignalRResult } from '@app/models';

describe('TagService', () => {
  let service: TagService;
  let signalR: SignalRService;
  let tags: string[];

  const initMockTags = [
    fake(f => f.random.word()),
    fake(f => f.random.word()),
    fake(f => f.random.word()),
    fake(f => f.random.word()),
    fake(f => f.random.word()),
    fake(f => f.random.word()),
    fake(f => f.random.word()),
    fake(f => f.random.word()),
    fake(f => f.random.word()),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SignalRService, useValue: { invoke: jest.fn() } },
        { provide: NotificationService, useValue: { danger: jest.fn() } },
      ],
    });

    service = TestBed.get(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTagSuggestions', () => {
    beforeEach(() => {
      signalR = TestBed.get(SignalRService);
    });

    it('should get 10 suggestions if the search text is blank', done => {
      const signalRResult: SignalRResult = {
        isSuccessful: true,
        item: initMockTags,
      };
      signalR.invoke = jest.fn(() => of(signalRResult));
      service.getTagSuggestions('').subscribe(tags$ => {
        expect(tags$).toEqual(signalRResult.item);
        done();
      });
    });
  });

  describe('addTag', () => {
    it('should handle bad data', () => {
      expect(() => {
        service.addTag(undefined, null);
      }).not.toThrowError();
    });

    it('should add tags to the card if none are there (for old objects without the tags)', () => {
      const mockCardWithNoTags = { ...mockCard, tags: null };
      const answer = service.addTag(mockCardWithNoTags, fake(f => f.random.word()));
      expect(answer).toBeTruthy();
    });

    it('should add tags', () => {
      const mockCardWithNoTags = { ...mockCard, tags: null };
      const tag = fake(f => f.random.word());
      service.addTag(mockCardWithNoTags, tag);
      expect(mockCardWithNoTags.tags).toEqual([tag]);
    });

    it('should not add duplicate tags', () => {
      const duplicate = 'duplicate';
      tags = [duplicate];
      const mockCardWithTags = { ...mockCard, tags };
      service.addTag(mockCardWithTags, duplicate);
      expect(mockCardWithTags.tags).toEqual(tags);
    });
  });

  describe('removeTag', () => {
    it('should handle bad data', () => {
      expect(() => {
        service.removeTag(undefined, null);
      }).not.toThrowError();
    });

    it('should hand a tag that is not there', () => {
      const tagToRemove = 'remove me';
      const mockCardWithTags = { ...mockCard, tags: ['a tag'] };
      service.removeTag(mockCardWithTags, tagToRemove);
      expect(mockCardWithTags.tags).toEqual(['a tag']);
    });

    it('should remove a tag', () => {
      const tagToRemove = 'remove me';
      const mockCardWithTags = { ...mockCard, tags: [tagToRemove] };
      service.removeTag(mockCardWithTags, tagToRemove);
      expect(mockCardWithTags.tags).toEqual([]);
    });
  });
});
