import { TestBed, inject } from '@angular/core/testing';

import { HeatmapDiagramService } from './heatmap-diagram.service';

describe('HeatmapDiagramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeatmapDiagramService]
    });
  });

  it('should be created', inject([HeatmapDiagramService], (service: HeatmapDiagramService) => {
    expect(service).toBeTruthy();
  }));
});
