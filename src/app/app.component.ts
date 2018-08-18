import { Component } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { Observable } from '../../node_modules/rxjs';
import { HeatmapData } from 'heatmap-diagram';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-heatmap-diagram-example-app';
  data$: Observable<HeatmapData>;

  constructor(private mockData: MockDataService) {
    this.data$ = mockData.getData();
  }
}
