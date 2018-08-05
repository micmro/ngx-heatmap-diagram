import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapDiagramComponent } from './heatmap-diagram.component';

describe('HeatmapDiagramComponent', () => {
  let component: HeatmapDiagramComponent;
  let fixture: ComponentFixture<HeatmapDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatmapDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
