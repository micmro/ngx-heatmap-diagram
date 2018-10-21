import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  /* tslint:disable:component-selector */
  selector: '[ngx-svg-legend-label]',
  templateUrl: './legend-label.component.html',
  styleUrls: ['./legend-label.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendLabelComponent implements OnInit {
  @Input() x: number;
  @Input() y: number;
  @Input() height: number;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }
}
