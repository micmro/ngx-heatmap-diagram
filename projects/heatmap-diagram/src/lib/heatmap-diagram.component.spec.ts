import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { HeatmapDiagramComponent } from './heatmap-diagram.component';
import { of } from 'rxjs';
import { makeHeatmapData } from './mocks/heatmap-data.mocks.spec';
import { HeatmapDiagramModule } from './heatmap-diagram.module';
import { HeatmapData } from './heatmap-interface';
import { DebugElement } from '@angular/core';
import { InvaidDataParameterError } from './errors-interface';

describe('HeatmapDiagramComponent', () => {
  let component: HeatmapDiagramComponent;
  let fixture: ComponentFixture<HeatmapDiagramComponent>;
  let de: DebugElement;
  let ne: HTMLElement;

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
    ne = fixture.nativeElement;
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

  it(`throws 'InvaidDataParameter' when data is not set`, () => {
    expect(() => {
      fixture.detectChanges();
    }).toThrow(InvaidDataParameterError);
  });

  it(`throws 'InvaidDataParameter' when data is not an Observable`, () => {
    component.data = {} as any;
    expect(() => {
      fixture.detectChanges();
    }).toThrow(InvaidDataParameterError);
  });

  it(`renders items`, fakeAsync(() => {
    const testData = [[1, 0], [2, 0], [3, 0]];
    component.data = of<HeatmapData>(makeHeatmapData(testData));
    fixture.detectChanges();
    tick(); // allow `RowLegendComponent`'s `widthUpdated` to emit
    fixture.detectChanges();
    const entries = ne.querySelectorAll('.entries > g');
    expect(entries.length).toBe(testData.length);
  }));

  it(`'maxTimeSlices' reduces displayed items`, fakeAsync(() => {
    const maxTimeSlices = 4;
    component.data = of<HeatmapData>(makeHeatmapData([[1, 0], [2, 0], [3, 0], [4, 0], [5, 0]]));
    component.maxTimeSlices = maxTimeSlices;
    fixture.detectChanges();
    tick(); // allow `RowLegendComponent`'s `widthUpdated` to emit
    fixture.detectChanges();
    const entries = ne.querySelectorAll('.entries > g');
    expect(entries.length).toBe(maxTimeSlices);
  }));
});
