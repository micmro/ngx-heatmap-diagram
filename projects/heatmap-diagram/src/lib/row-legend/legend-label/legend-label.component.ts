import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: '[ngx-svg-legend-label]',
  templateUrl: './legend-label.component.html',
  styleUrls: ['./legend-label.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendLabelComponent {
  @Input() x: number;
  @Input() y: number;
  @Input() height: number;
  @Input() label: string;

  constructor() { }
}
