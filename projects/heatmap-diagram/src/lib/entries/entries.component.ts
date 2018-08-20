import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TimeSlice } from '../heatmap-data';

@Component({
  /* tslint:disable:component-selector */
  selector: '[ngx-svg-entries]',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EntriesComponent implements OnInit {
  @Input() entry: TimeSlice;
  @Input() xIndex: number;

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index: number) {
    return index;
  }

}
