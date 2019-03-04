import { PlanIdentifierEffects } from './plan-identifier.effects';
import { PlanEffects } from './plan.effects';
import { BacklogSettingEffects } from './backlog-settings.effects';

export const effects: any[] = [PlanIdentifierEffects, PlanEffects, BacklogSettingEffects];

export * from './plan.effects';
export * from './plan-identifier.effects';
