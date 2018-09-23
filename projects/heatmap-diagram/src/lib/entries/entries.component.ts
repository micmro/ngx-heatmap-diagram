import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TimeSlice } from '../heatmap-interface';

@Component({
  /* tslint:disable:component-selector */
  selector: '[ngx-svg-entries]',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesComponent implements OnChanges {
  @Input() entry: TimeSlice;
  @Input() xIndex: number;
  /** Time-stamp of the current TimeSlice */
  @Input() time: Date;
  @Input() rowHeigth: number;
  @Input() columnWidth: number;
  @Input() rowSpacing = 5;
  @Input() columnSpacing = 5;

  labelY: number;
  label = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const maybeEntry = this.getChangeValue<TimeSlice>(changes, 'entry');
    const maybeTime = this.getChangeValue<Date>(changes, 'time');
    const maybeRowHeigth =  this.getChangeValue<number>(changes, 'rowHeigth');
    this.setLabelY(maybeEntry, maybeRowHeigth);
    this.setLabel(maybeEntry, maybeTime);
  }

  private setLabel(maybeEntry?: TimeSlice, maybeTime?: Date) {
    if (maybeEntry && maybeEntry.timeLabel !== undefined) {
      if (maybeEntry.timeLabel !== this.label) {
        this.label = maybeEntry.timeLabel;
      }
      return;
    }
    if (maybeTime !== undefined) {
      const newValue = this.label = formatDate(maybeTime, 'medium', 'en');
      if (this.label !== newValue) {
        this.label = newValue;
      }
      return;
    }
  }

  private setLabelY(maybeEntry?: TimeSlice, maybeRowHeigth?: number) {
    if (maybeEntry !== undefined) {
      this.labelY = maybeEntry.buckets.length * (maybeRowHeigth !== undefined ? maybeRowHeigth : this.rowHeigth);
    } else if (maybeRowHeigth !== undefined && this.entry) {
      this.labelY = this.entry.buckets.length * maybeRowHeigth;
    }
  }

  private getChangeValue<T>(changes: SimpleChanges, prop: (keyof EntriesComponent)): T | undefined {
    if (changes[prop] === undefined || changes[prop].currentValue === changes[prop].previousValue) {
      return undefined;
    }
    return changes[prop].currentValue;
  }

  trackByFn(index: number) {
    return index;
  }

}
