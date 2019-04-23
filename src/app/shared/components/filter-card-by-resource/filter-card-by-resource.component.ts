import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Resources } from '@app/models';
import { ConfigService } from '@app/app-services';

@Component({
  selector: 'td-filter-card-by-resource',
  templateUrl: './filter-card-by-resource.component.html',
  styleUrls: ['./filter-card-by-resource.component.scss'],
})
export class FilterCardByResourceComponent implements OnInit, OnChanges {
  @Input() resources: Resources[];
  @Output() valueChange = new EventEmitter<Resources[]>();

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.resources = [...this.resources, ...this.buildCustomPlaceholders()];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resources && !changes.resources.firstChange) {
      this.resources = [...changes.resources.currentValue, ...this.buildCustomPlaceholders()];
    }
  }

  searchResource(resources: Resources[]) {
    this.valueChange.emit(resources);
  }

  clearResponsibilityFilter() {
    this.valueChange.emit([]);
  }

  setResponsibilityFilterMy() {
    this.valueChange.emit(this.resources.filter(r => r.uid === this.config.config.UID.toLowerCase()));
  }

  setResponsibilityFilterPlaceholders() {
    this.valueChange.emit([this.resources.find(r => r.isPlaceholder && r.referenceId === -2)]);
  }

  selectUnassigned() {
    this.valueChange.emit([this.resources.find(r => r.referenceId === -1)]);
  }

  private buildCustomPlaceholders(): Resources[] {
    const unassigned: Resources = {
      isPlaceholder: false,
      referenceId: -1,
      name: 'Unassigned',
      uid: '00000000-0000-0000-0000-000000000000',
      email: '',
      firstName: '',
      lastName: '',
      profilePicturePath: null,
      permissions: false,
    };

    const placeholder: Resources = {
      isPlaceholder: true,
      referenceId: -2,
      name: 'Resource Placeholders',
      firstName: 'Resource',
      lastName: 'Placeholders',
      uid: '00000000-0000-0000-0000-000000000000',
      profilePicturePath: this.config.config.UserProfilePathBase + 'DoesNotExist',
      permissions: false,
      email: '',
    };

    return [unassigned, placeholder];
  }
}
