import { TestBed, async } from '@angular/core/testing';

import { BoardService } from './board.service';
import { SignalRService } from './signal-r.service';
import { mockBoard } from '@app/test/data';

const mockBoardExample = Object.assign({}, mockBoard, { projectId: 233386, id: 90067305 });
const mockBoardExample2 = Object.assign({}, mockBoard, { projectId: 233386, id: 90067305 });

const mockInvoke = () => {
  return { subscribe: jest.fn(cb => cb({ item: mockBoardExample, mockBoardExample2 })) };
};

const mockSignalR = {
  invoke: mockInvoke,
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
