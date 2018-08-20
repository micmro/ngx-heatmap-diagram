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
  @Input() data: Observable<HeatmapData>;
  /** The maximum amount of  */
  @Input() maxTimeSlices?: number;
  innerData$: Observable<HeatmapData>;

  constructor() {
  }

  ngOnInit() {
    if (this.data === undefined) {
      throw Error(`'data' parameter is not set`);
    }
    const hasMax = this.maxTimeSlices !== undefined;
    console.log('ngOnInit', hasMax );
    this.innerData$ = this.data.pipe(
      map(d => {
        if (this.maxTimeSlices === undefined) {
          return d;
        }
        return d;
      })
    );
    }
}
