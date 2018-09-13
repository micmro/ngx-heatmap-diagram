import { NgModule } from '@angular/core';
import { HeatmapDiagramComponent } from './heatmap-diagram.component';
import { DiagramComponent } from './diagram/diagram.component';
import { EntriesComponent } from './entries/entries.component';
import { CommonModule } from '@angular/common';
import { ColorMapperService } from './color-mapper/color-mapper.service';
import { TimeLabelComponent } from './time-label/time-label.component';
import { LegendLabelComponent } from './legend-label/legend-label.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HeatmapDiagramComponent,
    DiagramComponent,
    EntriesComponent,
    TimeLabelComponent,
    LegendLabelComponent
  ],
  providers: [
    ColorMapperService
  ],
  exports: [
    HeatmapDiagramComponent
  ]
})
export class HeatmapDiagramModule { }
