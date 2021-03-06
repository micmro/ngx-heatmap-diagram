import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: '[ngx-svg-time-label]',
  templateUrl: './time-label.component.html',
  styleUrls: ['./time-label.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeLabelComponent implements OnInit {
  @Input() x: number;
  @Input() y: number;
  @Input() label: string;

  constructor() {}

  ngOnInit() {}
}
