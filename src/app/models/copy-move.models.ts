import { Plan } from './plan.model';
import { Project } from './project.model';
import { List } from './list.model';

export interface CopyMoveData {
  projects: Project[];
  plans: Plan[];
  lists: List[];
}

export interface SelectedCopyMoveCardData {
  selectedProject: Project;
  selectedPlan: Plan;
  selectedList: List;
}
