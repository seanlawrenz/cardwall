import { Board } from './board.model';

export interface PlanIdentifier {
  planID: number;
  projectID: number;
  planName: string;
  projectName: string;
}

export interface Plan extends Board {
  projectName: string;
  erroredDuringFetching?: boolean;
  message?: string;
  reason?: string;
}
