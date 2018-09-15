/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeatmapDataService } from './heatmap-data.service';

describe('Service: HeatmapData', () => {
  let service: HeatmapDataService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(HeatmapDataService);
  }));


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
