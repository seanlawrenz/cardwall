import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNotify from '../reducers/notification.reducer';

export const getNotificationState = createFeatureSelector<fromNotify.NotifyState>('notifications');

export const getNotifications = createSelector(
  getNotificationState,
  state => state.notifications,
);
