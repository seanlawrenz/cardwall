import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as settingActions from '@app/backlog/state/actions/backlog-settings.actions';
import { tap, map, switchMap } from 'rxjs/operators';
import { EstimateVisibilityMode, BacklogSettingsChanges } from '@app/models';
import { isNullOrUndefined } from 'util';
import { Action } from '@ngrx/store';

@Injectable()
export class BacklogSettingEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  getSettingsFromLocalStorage$ = this.actions$.pipe(
    ofType(settingActions.BacklogSettingActionTypes.GET_FROM_LOCAL_STORAGE),
    switchMap(action => {
      let estimatesVisibility = <EstimateVisibilityMode>(
        JSON.parse(window.localStorage.getItem('Agile.Settings.Backlog.EstimateVisibility'))
      );
      let WIPLimits = <boolean>JSON.parse(window.localStorage.getItem('Agile.Settings.Backlog.ShowLimits'));

      // Set initial / fallback values
      estimatesVisibility = isNullOrUndefined(estimatesVisibility) ? EstimateVisibilityMode.all : estimatesVisibility;
      WIPLimits = isNullOrUndefined(WIPLimits) ? false : WIPLimits;

      // Updating the enum
      let backlogSettings: Action[];
      switch (estimatesVisibility) {
        case EstimateVisibilityMode.all:
          backlogSettings = [new settingActions.ShowEstimatedHours(), new settingActions.ShowStoryPoints()];
          break;
        case EstimateVisibilityMode.estimatedHours:
          backlogSettings = [new settingActions.HideStoryPoints(), new settingActions.ShowEstimatedHours()];
          break;
        case EstimateVisibilityMode.storyPoints:
          backlogSettings = [new settingActions.ShowStoryPoints(), new settingActions.HideEstimatedHours()];
          break;
        case EstimateVisibilityMode.none:
          backlogSettings = [new settingActions.HideEstimatedHours(), new settingActions.HideStoryPoints()];
          break;
        default:
          backlogSettings = [new settingActions.ShowEstimatedHours(), new settingActions.ShowStoryPoints()];
      }
      const WIPAction = WIPLimits === true ? new settingActions.ShowWIPLimits() : new settingActions.HideWIPLimits();
      backlogSettings.push(WIPAction);
      return backlogSettings;
    }),
  );
}
