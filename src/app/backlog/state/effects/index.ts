import { PlanIdentifierEffects } from './plan-identifier.effects';
import { PlanEffects } from './plan.effects';

export const effects: any[] = [PlanIdentifierEffects, PlanEffects];

export * from './plan.effects';
export * from './plan-identifier.effects';
