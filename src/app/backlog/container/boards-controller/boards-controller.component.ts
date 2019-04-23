import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Plan, Card, Resources } from '@app/models';
import { SortablejsOptions } from 'angular-sortablejs';
import { Store } from '@ngrx/store';
import * as fromBacklog from '../../state';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { cloneDeep, startsWith, trimStart, find } from 'lodash';

@Component({
  selector: 'td-boards-controller',
  templateUrl: './boards-controller.component.html',
  styleUrls: ['./boards-controller.component.scss'],
})
export class BoardsControllerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() plans: Plan[];
  filteredPlans: Plan[];
  searchTerm = '';
  searchResource = [];
  showResources$: Observable<boolean>;
  showToolbar$: Observable<boolean>;

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
        if (typeof term === 'string') {
          this.searchTerm = term;
        } else {
          this.searchResource = term;
        }
        this.filteredPlans = this.searchCards(this.plans, term);
      });

    this.filteredPlans = [...this.plans];

    this.showResources$ = this.store.select(fromBacklog.showResources);
    this.showToolbar$ = this.store.select(fromBacklog.showTotals);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.plans && !changes.plans.firstChange) {
      this.filteredPlans = this.searchCards(changes.plans.currentValue, this.searchTerm);
      this.filteredPlans = this.searchCards(this.filteredPlans, this.searchResource);
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

  private searchCards(plansToFilter: Plan[], term: string | Resources[]): Plan[] {
    const plans = cloneDeep(plansToFilter);

    if (typeof term === 'string') {
      if (term === '' && this.searchResource.length === 0) {
        return plans;
      }

      let filteredPlans = this.searchByText(plans, term);
      if (this.searchResource.length > 0) {
        filteredPlans = this.searchByResource(filteredPlans, this.searchResource);
      }

      return filteredPlans;
    } else {
      if (term.length === 0 && this.searchTerm === '') {
        return plans;
      }

      let filteredPlans = this.searchByResource(plans, term);
      if (this.searchTerm !== '') {
        filteredPlans = this.searchByText(filteredPlans, this.searchTerm);
      }
      return filteredPlans;
    }
  }

  private searchByText(plans: Plan[], term: string): Plan[] {
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

  private searchByResource(plans: Plan[], resources: Resources[]): Plan[] {
    const unassigned: boolean = find(resources, r => r.referenceId === -1) !== undefined;
    const searchOwners = (card): boolean => card.owners.filter(owner => find(resources, res => res.uid === owner.uid)).length > 0;

    return plans.map(plan => {
      plan.lists = plan.lists.map(list => {
        list.cards = list.cards.filter(card => {
          if (!unassigned) {
            if (card.owners && card.owners.length > 0) {
              if (searchOwners(card)) {
                return card;
              }
            }
          } else {
            if (!card.owners || card.owners.length === 0) {
              return card;
            } else {
              if (searchOwners(card)) {
                return card;
              }
            }
          }
        });
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
