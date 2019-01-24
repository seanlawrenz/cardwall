import { Injectable } from '@angular/core';
import { Config } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: Config;
  constructor() {
    this.config = window.TeamDynamix.Config;

    this.config.DateFormatString = this.config.DateFormatString || 'ddd M/D/YYYY';
    this.config.DateFormatStringNoDayOfWeek = this.config.DateFormatStringNoDayOfWeek || 'M/D/YYYY';
    this.config.SignalRHubName = this.config.SignalRHubName || 'PlanHub';
    this.config.IsDebug = this.config.IsDebug || false;
    this.config.IsTDNext = this.config.IsTDNext || false;
    this.config.WorkdaysPerWeek = this.config.WorkdaysPerWeek || 5;
    this.config.HoursPerDay = this.config.HoursPerDay || 8;
    this.config.IsSourceControlEnabled = this.config.IsSourceControlEnabled || false;
    this.config.HasAnalysis = this.config.HasAnalysis || false;
    this.config.CanAddPlans = this.config.CanAddPlans || false;
    this.config.CanAddTasks = this.config.CanAddTasks || false;
    this.config.CanEditTasks = this.config.CanEditTasks || false;
    this.config.CanDeletePlans = this.config.CanDeletePlans || false;
    this.config.CanDeleteTasks = this.config.CanDeleteTasks || false;
    this.config.CanEditPlans = this.config.CanEditPlans || false;
    this.config.CanUpdateTasks = this.config.CanUpdateTasks || false;
    this.config.CanAddIssues = this.config.CanAddIssues || false;
    this.config.CanDeleteIssues = this.config.CanDeleteIssues || false;
  }

  get dateFormatString() {
    return this.config.DateFormatString;
  }

  get dateFormatStringNoDayOfWeek() {
    return this.config.DateFormatStringNoDayOfWeek;
  }

  get isDebug() {
    return this.config.IsDebug;
  }

  get isElectron() {
    return this.config.IsElectron;
  }
}
