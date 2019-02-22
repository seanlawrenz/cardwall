import { updateListOrderInBacklog } from './listOperations';
import { mockBoardBuilder, mockListBuilder } from '@app/test/data';
import { Plan, ListReorderInfo } from '@app/models';

describe('updateListOrderInBackl', () => {
  const mockPlan: Plan = mockBoardBuilder();
  const mockPlan2: Plan = mockBoardBuilder();
  const mockListFromMockPlan1 = mockListBuilder();
  const mockListFromMockPlan2 = mockListBuilder();
  const mockListFromMockPlan3 = mockListBuilder();
  let plans: Plan[];

  it('should return plans', () => {
    plans = updateListOrderInBacklog([mockPlan, mockPlan2], undefined);
    expect(plans).toEqual([mockPlan, mockPlan2]);
  });

  it('should reorder List via reorder', () => {
    mockPlan.lists = [mockListFromMockPlan1, mockListFromMockPlan2, mockListFromMockPlan3];
    const reorder: ListReorderInfo = {
      planID: mockPlan.id,
      projectID: mockPlan.projectId,
      sortedListIDs: [mockListFromMockPlan2.id, mockListFromMockPlan1.id, mockListFromMockPlan3.id],
    };

    plans = updateListOrderInBacklog([mockPlan, mockPlan2], reorder);
    expect(plans[0].lists).toEqual([mockListFromMockPlan2, mockListFromMockPlan1, mockListFromMockPlan3]);
  });
});
