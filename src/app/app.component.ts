import { Component } from '@angular/core';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-heatmap-diagram-example-app';

  constructor(public mockData: MockDataService) {
  }
}
