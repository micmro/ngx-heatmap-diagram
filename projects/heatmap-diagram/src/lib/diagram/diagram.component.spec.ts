import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeatmapDiagramModule } from '../heatmap-diagram.module';
import { get3TimeSlice2RowBasicHeatmapDataInternal, makeHeatmapDataInternal } from '../mocks/heatmap-data.mocks.spec';
import { DiagramComponent } from './diagram.component';
import { HeatmapDataInternal } from '../heatmap-data-internal-interface';

describe('DiagramComponent', () => {
  let component: DiagramComponent;
  let fixture: ComponentFixture<DiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HeatmapDiagramModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.data = of<HeatmapDataInternal>(get3TimeSlice2RowBasicHeatmapDataInternal());
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('works with empty dats', () => {
    component.data = of<HeatmapDataInternal>(makeHeatmapDataInternal([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
