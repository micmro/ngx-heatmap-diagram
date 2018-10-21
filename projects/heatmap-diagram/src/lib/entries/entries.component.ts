import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TimeSlice } from '../heatmap-interface';

@Component({
  /* tslint:disable:component-selector */
  selector: '[ngx-svg-entries]',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EntriesComponent {
  @Input() entries: TimeSlice[];
  @Input() rowHeigth: number;
  @Input() columnWidth: number;
  @Input() rowSpacing: number;
  @Input() columnSpacing: number;
  @Input() xOffset: number;

  constructor() { }

  trackByFn(index: number) {
    return index;
  }
}
