import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TimeSlice } from '../heatmap-interface';

@Component({
  /* tslint:disable:component-selector */
  selector: '[ngx-svg-entries]',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesComponent implements OnInit {
  @Input() entry: TimeSlice;
  @Input() xIndex: number;
  // @Input() startTime: Date?;

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index: number) {
    return index;
  }

}
