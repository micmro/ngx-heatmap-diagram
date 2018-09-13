import { NgModule } from '@angular/core';
import { HeatmapDiagramComponent } from './heatmap-diagram.component';
import { DiagramComponent } from './diagram/diagram.component';
import { EntriesComponent } from './entries/entries.component';
import { CommonModule } from '@angular/common';
import { ColorMapperService } from './color-mapper/color-mapper.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HeatmapDiagramComponent,
    DiagramComponent,
    EntriesComponent,
  ],
  providers: [
    ColorMapperService
  ],
  exports: [
    HeatmapDiagramComponent
  ]
})
export class HeatmapDiagramModule { }
