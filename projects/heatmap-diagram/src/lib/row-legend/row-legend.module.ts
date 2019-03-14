import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LegendLabelComponent } from './legend-label/legend-label.component';
import { RowLegendComponent } from './row-legend.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RowLegendComponent, LegendLabelComponent],
  exports: [RowLegendComponent]
})
export class RowLegendModule {}
