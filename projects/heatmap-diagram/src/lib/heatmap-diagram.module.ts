import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiagramComponent } from './diagram/diagram.component';
import { EntriesModule } from './entries/entries.module';
import { HeatmapDiagramComponent } from './heatmap-diagram.component';
import { RowLegendModule } from './row-legend/row-legend.module';
import { ColorMapperService } from './services/color-mapper.service';
import { HeatmapDataService } from './services/heatmap-data.service';

@NgModule({
  imports: [CommonModule, RowLegendModule, EntriesModule],
  declarations: [HeatmapDiagramComponent, DiagramComponent],
  providers: [ColorMapperService, HeatmapDataService],
  exports: [HeatmapDiagramComponent]
})
export class HeatmapDiagramModule {}
