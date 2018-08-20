import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { HeatmapData } from '../heatmap-data';

@Component({
  selector: 'ngx-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiagramComponent implements OnInit {
  @Input() data: Observable<HeatmapData>;

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index: number) {
    return index;
  }
}
