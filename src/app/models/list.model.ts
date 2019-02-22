import { Card } from './card.model';

export interface ListLimit {
  minValue: number;
  maxValue: number;
  statusID: number;
  projectID: number;
  planID: number;
}

export interface List {
  active: boolean;
  cards: Card[];
  description?: string;
  id: number;
  limits: ListLimit[];
  order: number;
  percentComplete: number;
  planId: number;
  projectId: number;
  statusTypeId?: number;
  title: string;
}

export interface ListReorderInfo {
  planID: number;
  projectID: number;
  sortedListIDs: Array<number>;
}
