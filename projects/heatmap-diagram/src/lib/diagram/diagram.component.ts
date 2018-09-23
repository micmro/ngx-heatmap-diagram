import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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

  constructor() { }

  trackByFn(index: number) {
    return index;
  }
}
