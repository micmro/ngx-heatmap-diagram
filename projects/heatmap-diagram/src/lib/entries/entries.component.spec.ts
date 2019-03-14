import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesComponent } from './entries.component';
import { TimeLabelComponent } from './time-label/time-label.component';
import { EntryComponent } from './entry/entry.component';

describe('EntriesComponent', () => {
  let component: EntriesComponent;
  let fixture: ComponentFixture<EntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntriesComponent, EntryComponent, TimeLabelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesComponent);
    component = fixture.componentInstance;
    component.entries = [
      {
        buckets: []
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
