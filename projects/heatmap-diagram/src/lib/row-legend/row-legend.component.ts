import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Label } from '../heatmap-interface';

@Component({
  selector: '[ngx-row-legend]',
  templateUrl: './row-legend.component.html',
  styleUrls: ['./row-legend.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowLegendComponent implements AfterViewChecked {
  @Input() labels: Label[];
  @Input() rowHeigth: number;
  @Input() rowSpacing: number;
  @ViewChild('legendLabel') legendLabel: ElementRef<SVGGElement>;
  @Output() widthUpdated = new EventEmitter<number>();

  /** keeps track of the current with of the legend */
  legendWidth = 0;

  constructor() { }

  trackByFn(index: number) {
    return index;
  }

  ngAfterViewChecked() {
    if (this.legendLabel !== undefined) {
      const newWidth = this.legendLabel.nativeElement.getBBox().width;
      if (newWidth !== this.legendWidth) {
        this.legendWidth = newWidth;
        setTimeout(() => { // wait for next change detection cycle
          this.widthUpdated.emit(newWidth);
        }, 0);
      }
    }
  }

}
