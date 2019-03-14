import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TimeSliceInternal } from '../../heatmap-data-internal-interface';

@Component({
  selector: '[ngx-svg-entry]',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryComponent implements OnChanges {
  @Input() entry: TimeSliceInternal;
  @Input() xIndex: number;
  /** Time-stamp of the current TimeSlice */
  @Input() time: Date;
  @Input() rowHeigth: number;
  @Input() columnWidth: number;
  @Input() rowSpacing: number;
  @Input() columnSpacing: number;

  labelY: number;
  label = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const maybeEntry = this.getChangeValue<TimeSliceInternal>(changes, 'entry');
    const maybeTime = this.getChangeValue<Date>(changes, 'time');
    const maybeRowHeigth = this.getChangeValue<number>(changes, 'rowHeigth');
    const maybeRowSpacing = this.getChangeValue<number>(changes, 'rowSpacing');
    this.setLabelY(maybeEntry, maybeRowHeigth, maybeRowSpacing);
    this.setLabel(maybeEntry, maybeTime);
  }

  private setLabel(maybeEntry?: TimeSliceInternal, maybeTime?: Date) {
    if (maybeEntry && maybeEntry.timeLabel !== undefined) {
      if (maybeEntry.timeLabel !== this.label) {
        this.label = maybeEntry.timeLabel;
      }
      return;
    }
    if (maybeTime !== undefined) {
      const newValue = (this.label = formatDate(maybeTime, 'medium', 'en'));
      if (this.label !== newValue) {
        this.label = newValue;
      }
      return;
    }
  }

  private setLabelY(maybeEntry?: TimeSliceInternal, maybeRowHeigth?: number, maybeRowSpacing?: number) {
    if (maybeEntry !== undefined) {
      this.labelY =
        maybeEntry.buckets.length * (maybeRowHeigth !== undefined ? maybeRowHeigth : this.rowHeigth) -
        (maybeRowSpacing !== undefined ? maybeRowSpacing : this.rowSpacing);
    } else if (maybeRowHeigth !== undefined && this.entry) {
      this.labelY = this.entry.buckets.length * maybeRowHeigth - (maybeRowSpacing !== undefined ? maybeRowSpacing : this.rowSpacing);
    } else if (maybeRowSpacing !== undefined && this.entry) {
      this.labelY = this.entry.buckets.length * this.rowSpacing - maybeRowSpacing;
    }
  }

  private getChangeValue<T>(changes: SimpleChanges, prop: keyof EntryComponent): T | undefined {
    if (changes[prop] === undefined || changes[prop].currentValue === changes[prop].previousValue) {
      return undefined;
    }
    return changes[prop].currentValue;
  }

  trackByFn(index: number) {
    return index;
  }
}
