import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeSliceInternal } from '../../heatmap-data-internal-interface';
import { TimeLabelComponent } from '../time-label/time-label.component';
import { EntryComponent } from './entry.component';


/** Helper test component */
@Component({
  template: `<svg><g ngx-svg-entry [entry]="entry" [xIndex]="xIndex"
    [time]="time" [rowHeigth]="rowHeigth" [columnWidth]="columnWidth" [rowSpacing]="rowSpacing" [columnSpacing]="columnSpacing"
  ></g></svg>`
})
class TestHostComponent {
  entry: TimeSliceInternal;
  xIndex: number;
  time: Date;
  rowHeigth: number;
  columnWidth: number;
  rowSpacing: number;
  columnSpacing: number;
}

fdescribe('EntryComponent', () => {
  let component: TestHostComponent;
  let element: SVGGElement;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryComponent, TimeLabelComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should create', () => {
    component.entry = {
      buckets: []
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('updates values via ngOnChanges', () => {
    component.entry = {
      buckets: []
    };
    fixture.detectChanges();
    expect(element.querySelectorAll('rect').length).toBe(0);
    component.entry = {
      buckets: [{value: 1, color: 'rgb(255,0,0)', label: 'some-lable'}],

    };
    fixture.detectChanges();
    expect(element.querySelectorAll('rect').length).toBe(1);
    const rect = element.querySelectorAll<SVGRectElement>('rect')[0];

    expect(rect.getAttribute('style')).toBe('fill: rgb(255, 0, 0);');
    // expect(rect.getAttribute('title')).toBe('some-lable');
  });
});
