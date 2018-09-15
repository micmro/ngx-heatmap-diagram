import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagramComponent } from './diagram.component';
import { HeatmapDiagramModule } from '../heatmap-diagram.module';
import { of } from 'rxjs';
import { HeatmapData } from '../heatmap-interface';
import { get3TimeSlice2RowBasicHeatmapData, makeHeatmapData } from '../mocks/heatmap-data.mocks.spec';

describe('DiagramComponent', () => {
  let component: DiagramComponent;
  let fixture: ComponentFixture<DiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HeatmapDiagramModule ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.data = of<HeatmapData>(get3TimeSlice2RowBasicHeatmapData());
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('works with empty dats', () => {
    component.data = of<HeatmapData>(makeHeatmapData([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
