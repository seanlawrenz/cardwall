import { Action } from '@ngrx/store';
import { PlanIdentifier } from '@app/models';

export enum PlanIdentifiersActionTypes {
  GET_AVAILABLE_PLAN_IDENTIFERS = '[BACKLOG] GET AVAILABLE PLAN IDENTIFERS',
  GET_AVAILABLE_PLAN_IDENTIFERS_SUCCESS = '[BACKLOG] GET AVAILABLE PLAN IDENTIFERS SUCCESS',
  GET_AVAILABLE_PLAN_IDENTIFERS_FAIL = '[BACKLOG] GET AVAILABLE PLAN IDENTIFERS FAIL',
}

export class GetAvailablePlanIdentifers implements Action {
  readonly type = PlanIdentifiersActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS;
}

export class GetAvailablePlansIdentifersSuccess implements Action {
  readonly type = PlanIdentifiersActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_SUCCESS;
  constructor(public payload: PlanIdentifier[]) {}
}

export class GetAvailablePlansIdentifersFail implements Action {
  readonly type = PlanIdentifiersActionTypes.GET_AVAILABLE_PLAN_IDENTIFERS_FAIL;
  constructor(public payload: string) {}
}

export type PlanIdentifierActions = GetAvailablePlanIdentifers | GetAvailablePlansIdentifersSuccess | GetAvailablePlansIdentifersFail;
