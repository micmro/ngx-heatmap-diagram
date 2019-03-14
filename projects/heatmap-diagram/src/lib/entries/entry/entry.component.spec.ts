import { Component, DebugElement, ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeSliceInternal, BucketInternal } from '../../heatmap-data-internal-interface';
import { TimeLabelComponent } from '../time-label/time-label.component';
import { EntryComponent } from './entry.component';
import { By } from '@angular/platform-browser';
import { formatDate } from '@angular/common';

/** Helper test component */
@Component({
  template: `
    <svg>
      <g
        ngx-svg-entry
        [entry]="entry"
        [xIndex]="xIndex"
        [time]="time"
        [rowHeigth]="rowHeigth"
        [columnWidth]="columnWidth"
        [rowSpacing]="rowSpacing"
        [columnSpacing]="columnSpacing"
      ></g>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.Default
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

describe('EntryComponent', () => {
  let component: TestHostComponent;
  let element: SVGGElement;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntryComponent, TimeLabelComponent, TestHostComponent]
    }).compileComponents();
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
    const label = 'some-lable';
    const color = 'rgb(255, 0, 123)';
    component.entry = {
      buckets: [{ value: 1, color, label }]
    };
    component.rowHeigth = 30;
    component.columnWidth = 20;
    component.rowSpacing = 25;
    component.columnSpacing = 15;
    component.xIndex = 3;

    fixture.detectChanges();
    expect(element.querySelectorAll('rect').length).toBe(1);
    const rects = element.querySelectorAll<SVGRectElement>('rect');
    const title = element.querySelectorAll<SVGRectElement>('title')[0];

    expect(rects.length).toBe(1);
    expect(rects[0].getAttribute('style')).toBe(`fill: ${color};`);
    expect(title.textContent).toBe(label);
  });

  describe('renders', () => {
    const buckets: BucketInternal[] = [
      { value: 1, color: 'rgb(255, 0, 123)', label: 'some-lable-1' },
      { value: 2, color: 'rgb(0, 12, 55)', label: '2' }
    ];
    let rects: NodeListOf<SVGRectElement>;
    let tiles: NodeListOf<SVGTitleElement>;

    beforeEach(() => {
      component.entry = { buckets };
      component.rowHeigth = 30;
      component.columnWidth = 20;
      component.rowSpacing = 25;
      component.columnSpacing = 15;
      component.xIndex = 3;

      fixture.detectChanges();
      rects = element.querySelectorAll<SVGRectElement>('rect');
      tiles = element.querySelectorAll<SVGRectElement>('title');
    });

    it('2 buckets', () => {
      expect(rects.length).toBe(2);
    });

    it(`each bucket with it's color`, () => {
      expect(rects[0].getAttribute('style')).toBe(`fill: ${buckets[0].color};`);
      expect(rects[1].getAttribute('style')).toBe(`fill: ${buckets[1].color};`);
    });

    it('each buckets with a label', () => {
      expect(tiles.length).toBe(2);
      expect(tiles[0].textContent).toBe(buckets[0].label);
      expect(tiles[1].textContent).toBe(buckets[1].label);
    });

    it('with title', () => {
      const time = new Date(1543768980414);
      const timeFormatted = formatDate(time, 'medium', 'en');
      component.time = time;
      fixture.detectChanges();
      const timeLabelFixture: DebugElement = fixture.debugElement.query(By.directive(EntryComponent));
      const timeLabelInstance: TimeLabelComponent = timeLabelFixture.componentInstance;
      expect(timeLabelInstance.label).toBe(timeFormatted);
    });

    it('update title', () => {
      const time1 = new Date(1553768980414);
      const time1Formatted = formatDate(time1, 'medium', 'en');
      const time2 = new Date(1543768980424);
      const time2Formatted = formatDate(time2, 'medium', 'en');
      let timeLabelInstance: TimeLabelComponent;
      component.time = time1;
      fixture.detectChanges();
      timeLabelInstance = fixture.debugElement.query(By.directive(EntryComponent)).componentInstance;
      expect(timeLabelInstance.label).toBe(time1Formatted);
      component.time = time2;
      fixture.detectChanges();
      timeLabelInstance = fixture.debugElement.query(By.directive(EntryComponent)).componentInstance;
      expect(timeLabelInstance.label).toBe(time2Formatted);
    });
  });

  describe('test EntryComponent directly', () => {
    let entryComponentFixture: DebugElement;
    let entryComponentInstance: EntryComponent;
    beforeEach(() => {
      entryComponentFixture = fixture.debugElement.query(By.directive(EntryComponent));
      entryComponentInstance = entryComponentFixture.componentInstance;
    });

    it('trackByFn returns input', () => {
      expect(entryComponentInstance.trackByFn(123)).toBe(123);
    });
  });
});
