import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromResource from '../reducers/resource.reducer';

export const getResourceState = createFeatureSelector<fromResource.ResourceState>('resource');

export const getCurrentResource = createSelector(
  getResourceState,
  state => state.selectedResource,
);
