import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TimeSliceInternal } from '../heatmap-data-internal-interface';

@Component({
  selector: '[ngx-svg-entries]',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesComponent {
  @Input() entries: TimeSliceInternal[];
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
