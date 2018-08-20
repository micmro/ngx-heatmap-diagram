import { NgModule } from '@angular/core';
import { HeatmapDiagramComponent } from './heatmap-diagram.component';
import { DiagramComponent } from './diagram/diagram.component';
import { EntriesComponent } from './entries/entries.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeatmapDiagramComponent, DiagramComponent, EntriesComponent],
  exports: [HeatmapDiagramComponent]
})
export class HeatmapDiagramModule { }
