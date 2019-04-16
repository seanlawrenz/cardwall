import { PlanIdentifierEffects } from './plan-identifier.effects';
import { PlanEffects } from './plan.effects';
import { BacklogSettingEffects } from './backlog-settings.effects';
import { BacklogCardEffects } from './backlog-card.effects';

export const effects: any[] = [PlanIdentifierEffects, PlanEffects, BacklogSettingEffects, BacklogCardEffects];

export * from './plan.effects';
export * from './plan-identifier.effects';
export * from './backlog-card.effects';
