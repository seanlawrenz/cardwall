import { TestBed, async } from '@angular/core/testing';

import { BoardService } from './board.service';
import { SignalRService } from './signal-r.service';
import { mockBoard } from '@app/test/data';

const mockBoardExample = Object.assign({}, mockBoard, { projectId: 233386, id: 90067305 });
const mockBoardExample2 = Object.assign({}, mockBoard, { projectId: 233386, id: 90067305 });

const failedMessage = 'Cannot Get Board';
const failedReason = 'You do not have access to this project';

const mockInvoke = () => {
  return { subscribe: jest.fn(cb => cb({ isSuccessful: true, item: mockBoardExample, mockBoardExample2 })) };
};

const failedMockInvoke = () => {
  return { subscribe: jest.fn(cb => cb({ isSuccessful: false, item: mockBoardExample, message: failedMessage, reason: failedReason })) };
};

const mockSignalR = {
  invoke: mockInvoke,
};

const failedMockService = {
  invoke: failedMockInvoke,
};

describe('BoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SignalRService, useValue: mockSignalR }],
    });
  });
  let service: BoardService;
  let signalRSvc: SignalRService;

  beforeEach(() => {
    service = TestBed.get(BoardService);
    signalRSvc = TestBed.get(SignalRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBoardsFromParams', () => {
    it('should return an empty array if no params', async(() => {
      service.getBoardsFromParams(undefined).subscribe(boards => {
        expect(boards).toEqual([]);
      });
    }));

    it('should handle a bad url that has an extra comma at the end', async(() => {
      service.getBoardsFromParams('233386_90067305,233386_90067309,').subscribe(boards => {
        expect(boards).toEqual([mockBoardExample, mockBoardExample2]);
      });
    }));

    it('should return an array of boards', async(() => {
      service.getBoardsFromParams('233386_90067305,233386_90067309').subscribe(boards => {
        expect(boards).toEqual([mockBoardExample, mockBoardExample2]);
      });
    }));
  });
});

describe('Board Service', () => {
  let service: BoardService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SignalRService, useValue: failedMockService }],
    });
  });

  beforeEach(() => {
    service = TestBed.get(BoardService);
  });

  it('should return an error on a board that user has no access to', async(() => {
    const failedBoardReq = Object.assign({}, mockBoardExample, {
      erroredDuringFetching: true,
      message: failedMessage,
      reason: failedReason,
    });
    service.getBoardsFromParams('233386_90067305').subscribe(boards => {
      expect(boards).toEqual([failedBoardReq]);
    });
  }));
});
