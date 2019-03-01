import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fromRoot } from '@app/store';
import * as rootActions from '@app/store/actions/ui.actions';
import * as fromBacklog from '@app/backlog/state';
import * as settingActions from '@app/backlog/state/actions/backlog-settings.actions';
import { Observable } from 'rxjs';
import { BacklogSettingsChanges } from '@app/models';

@Component({
  selector: 'td-backlog-settings-container',
  templateUrl: './backlog-settings-container.component.html',
  styleUrls: ['./backlog-settings-container.component.scss'],
})
export class BacklogSettingsContainerComponent implements OnInit {
  showWIP$: Observable<boolean>;
  showStoryPoints$: Observable<boolean>;
  showEstimateHours: Observable<boolean>;

  constructor(private store: Store<fromBacklog.BacklogState>, private appStore: Store<fromRoot.State>) {}

  ngOnInit() {
    this.showWIP$ = this.store.pipe(select(fromBacklog.showWIPLimits));
    this.showStoryPoints$ = this.store.pipe(select(fromBacklog.showStoryPoints));
    this.showEstimateHours = this.store.pipe(select(fromBacklog.showEstimateHours));
  }

  updateSettings(event: { type: string; selected?: boolean }) {
    switch (event.type) {
      case BacklogSettingsChanges.WIP:
        this.updateWIPLimit(event.selected);
        break;

      case BacklogSettingsChanges.SHOW_ALL:
        this.updateStoryPoints(true);
        this.updateEstimatedHours(true);
        break;

      case BacklogSettingsChanges.SHOW_POINTS:
        this.updateStoryPoints(true);
        this.updateEstimatedHours(false);
        break;

      case BacklogSettingsChanges.SHOW_ESTIMATED_HOURS:
        this.updateStoryPoints(false);
        this.updateEstimatedHours(true);
        break;

      case BacklogSettingsChanges.SHOW_NONE:
        this.updateStoryPoints(false);
        this.updateEstimatedHours(false);
        break;

      default:
        return;
    }
  }

  updateWIPLimit(show: boolean) {
    show === true ? this.store.dispatch(new settingActions.ShowWIPLimits()) : this.store.dispatch(new settingActions.HideWIPLimits());
  }

  updateStoryPoints(show: boolean) {
    show === true ? this.store.dispatch(new settingActions.ShowStoryPoints()) : this.store.dispatch(new settingActions.HideStoryPoints());
  }

  updateEstimatedHours(show: boolean) {
    show === true
      ? this.store.dispatch(new settingActions.ShowEstimatedHours())
      : this.store.dispatch(new settingActions.HideEstimatedHours());
  }

  closeSettings() {
    this.appStore.dispatch(new rootActions.HideOptions());
  }
}
