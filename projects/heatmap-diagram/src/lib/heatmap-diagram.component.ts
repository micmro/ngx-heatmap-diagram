import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HeatmapData } from './heatmap-interface';
import { map, filter, share, tap } from 'rxjs/operators';
import { HeatmapDataService } from './services/heatmap-data.service';

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
  // TODO: allow fixed max/min of colors

  innerData$: Observable<HeatmapData>;

  constructor(private dataService: HeatmapDataService) {
  }

  ngOnInit() {
    if (this.data === undefined) {
      throw Error(`'data' parameter is not set`);
    }
    this.innerData$ = this.data.pipe(
      map(d => this.dataService.validateAndFill(d, this.maxTimeSlices))
    );
  }
}
