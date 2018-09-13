import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { HeatmapData } from './heatmap-data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-heatmap-diagram',
  template: `
    <ngx-diagram [data]="innerData$"></ngx-diagram>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatmapDiagramComponent implements OnInit {
  /** The data to show */
  @Input() data: Observable<HeatmapData>;
  /** The maximum amount of time-slices to show in the diagram (optional) */
  @Input() maxTimeSlices?: number;
  // TODO: make colors configurable

  innerData$: Observable<HeatmapData>;

  constructor() {
  }

  ngOnInit() {
    if (this.data === undefined) {
      throw Error(`'data' parameter is not set`);
    }
    this.innerData$ = this.data.pipe(
      map(this.sliceMaxTime)
    );
  }

  sliceMaxTime(input: HeatmapData): HeatmapData {
    if (this.maxTimeSlices === undefined || input.entries.length <= this.maxTimeSlices) {
      return input;
    }
    const interval = (input.endTime.getTime() - input.startTime.getTime()) / input.entries.length;
    return {
      ...input,
      startTime: new Date(input.endTime.getTime() - (this.maxTimeSlices * interval)),
      entries: input.entries.slice(0,  this.maxTimeSlices)
    };
  }
}
