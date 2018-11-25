import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable, isObservable } from 'rxjs';
import { HeatmapData } from './heatmap-interface';
import { map } from 'rxjs/operators';
import { HeatmapDataService } from './services/heatmap-data.service';
import { InvaidDataParameterError } from './errors-interface';
import { HeatmapDataInternal } from './heatmap-data-internal-interface';

@Component({
  selector: 'ngx-heatmap-diagram',
  template: `
    <ngx-diagram
      [data]="innerData$"
      [rowHeigth]="rowHeigth"
      [columnWidth]="columnWidth"
      [rowSpacing]="rowSpacing"
      [columnSpacing]="columnSpacing">
    </ngx-diagram>
  `,
  styles: [
    ':host { font-size: 12px; line-height: 12px; font-family: sans-serif; }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatmapDiagramComponent implements OnInit {
  /** The data to show */
  @Input() data: Observable<HeatmapData>;
  /** The maximum amount of time-slices to show in the diagram (optional) */
  @Input() maxTimeSlices?: number;
  /** Color to use for the smalles value visible in the diagram (hex, rgb or rgba CSS color syntax) */
  @Input() minValueColor = '#f00';
  /** Color to use for the largest value visible in the diagram (hex, rgb or rgba CSS color syntax) */
  @Input() maxValueColor = '#0f0';
  /** Number of color-gradients to show between min and max value */
  @Input() colorSteps = 6;
  /** Height of a single row */
  @Input() rowHeigth = 20;
  /** Width of a single column */
  @Input() columnWidth = 20;
  /** Vertical spacing between rows (substracted from `rowHeigth`) */
  @Input() rowSpacing = 5;
  /** Horizontal spacing between columns (substracted from `columnWidth`) */
  @Input() columnSpacing = 5;


  innerData$: Observable<HeatmapDataInternal>;

  constructor(private dataService: HeatmapDataService) {
  }

  ngOnInit() {
    if (!isObservable(this.data)) {
      throw InvaidDataParameterError;
    }
    this.innerData$ = this.data.pipe(
      map(emission => this.dataService.validateAndFill(
        emission,
        this.minValueColor,
        this.maxValueColor,
        this.colorSteps,
        this.maxTimeSlices
      ))
    );
  }
}
