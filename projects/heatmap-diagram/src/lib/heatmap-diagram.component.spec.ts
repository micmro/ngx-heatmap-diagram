import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapDiagramComponent } from './heatmap-diagram.component';
import { of } from 'rxjs';
import { makeHeatmapData } from './mocks/heatmap-data.mocks.spec';
import { HeatmapDiagramModule } from './heatmap-diagram.module';
import { HeatmapData } from './heatmap-interface';
import { DebugElement } from '@angular/core';

describe('HeatmapDiagramComponent', () => {
  let component: HeatmapDiagramComponent;
  let fixture: ComponentFixture<HeatmapDiagramComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HeatmapDiagramModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapDiagramComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create', () => {
    component.data = of<HeatmapData>(makeHeatmapData([[1, 0], [0, 1]]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('works with empty data', () => {
    component.data = of<HeatmapData>(makeHeatmapData([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('maxTimeSlices reduces displayed items', () => {
    component.data = of<HeatmapData>(makeHeatmapData([[1, 0], [2, 0], [3, 0], [4, 0], [5, 0]]));
    component.maxTimeSlices = 4;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const xx = fixture.nativeElement.querySelector('h1');

  });
});
