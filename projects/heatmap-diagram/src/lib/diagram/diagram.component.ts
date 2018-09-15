import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { HeatmapData } from '../heatmap-interface';
import { share } from 'rxjs/operators';

@Component({
  selector: 'ngx-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiagramComponent {
  @Input() data: Observable<HeatmapData>;

  constructor() { }

  trackByFn(index: number) {
    return index;
  }
}
