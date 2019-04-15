import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Plan, Card } from '@app/models';
import { SortablejsOptions } from 'angular-sortablejs';
import { Store } from '@ngrx/store';
import * as fromBacklog from '../../state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { cloneDeep, startsWith, trimStart } from 'lodash';

@Component({
  selector: 'td-boards-controller',
  templateUrl: './boards-controller.component.html',
  styleUrls: ['./boards-controller.component.scss'],
})
export class BoardsControllerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() plans: Plan[];
  filteredPlans: Plan[];
  searchTerm = '';

  private unsubscribe$ = new Subject<void>();

  constructor(private location: Location, private store: Store<fromBacklog.BacklogState>) {}

  sortableOptions: SortablejsOptions = {
    group: 'backlogPlans',
    handle: '.plan-drag-handle',
    onEnd: () => this.sortPlans(),
  };

  ngOnInit() {
    this.store
      .select(fromBacklog.getSearch)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(term => {
        this.searchTerm = term;
        this.filteredPlans = this.searchCards(this.plans, term);
      });

    this.filteredPlans = [...this.plans];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.plans && !changes.plans.firstChange) {
      this.filteredPlans = this.searchCards(changes.plans.currentValue, this.searchTerm);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sortPlans() {
    let url = 'backlog?boards=';

    this.plans.map(plan => {
      url += `${plan.projectId}_${plan.id},`;
    });
    url = url.slice(0, -1);
    this.location.go(url);

    this.store.dispatch(new fromBacklog.ReorderPlans(this.plans));
  }

  private searchCards(plansToFilter: Plan[], term: string): Plan[] {
    const plans = cloneDeep(plansToFilter);
    if (term === '') {
      return plans;
    }

    return plans.map(plan => {
      plan.lists = plan.lists.map(list => {
        if (startsWith(term, '#')) {
          list.cards = this.includesTag(list.cards, term);
        } else {
          list.cards = list.cards.filter(card => card.name.toLowerCase().includes(term.toLowerCase()));
        }
        return list;
      });
      return plan;
    });
  }

  private includesTag(cards: Card[], searchTerm): Card[] {
    let term = trimStart(searchTerm, '#');
    if (term !== '') {
      term = term.toLowerCase();
      return cards.filter(card => {
        if (card.tags) {
          const tags = card.tags.filter(tag => tag.toLowerCase().includes(term));
          if (tags.length > 0) {
            return card;
          }
        }
      });
    } else {
      return cards.filter(card => card.tags);
    }
  }
}
