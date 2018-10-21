import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HeatmapDataInternal } from '../heatmap-data-internal-interface';

@Component({
  selector: 'ngx-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiagramComponent {
  @Input() data: Observable<HeatmapDataInternal>;
  @Input() rowHeigth: number;
  @Input() columnWidth: number;
  @Input() rowSpacing: number;
  @Input() columnSpacing: number;

  legendTransform = 'translate(0)';
  legendStyle = {};
  legendWidth = undefined;
  hasLegendWidth = false;

  constructor() { }

  setLegendWidth(legendWidth: number) {
    this.hasLegendWidth = true;
    this.legendWidth = legendWidth;
  }

  trackByFn(index: number) {
    return index;
  }
}
