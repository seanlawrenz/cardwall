import { build, fake } from 'test-data-bot';
import { PlanIdentifier } from '@app/models';

const mockPlansBuild = build('plans').fields({
  planID: fake(f => f.random.number()),
  projectID: fake(f => f.random.number()),
  planName: fake(f => f.random.word()),
  projectName: fake(f => f.random.word()),
});

export const mockPlan1: PlanIdentifier = mockPlansBuild();
export const mockPlan2: PlanIdentifier = mockPlansBuild();
export const mockPlan3: PlanIdentifier = mockPlansBuild();
export const mockPlan4: PlanIdentifier = mockPlansBuild();
export const mockPlan5: PlanIdentifier = mockPlansBuild();

export const mockPlans: PlanIdentifier[] = [mockPlan1, mockPlan2, mockPlan3, mockPlan4, mockPlan5];
