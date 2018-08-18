import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeatmapDiagramModule } from 'heatmap-diagram';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeatmapDiagramModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
