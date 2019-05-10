import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../utils/custom-route-serializer';

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
