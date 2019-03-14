/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeLabelComponent } from './time-label.component';

describe('TimeLabelComponent', () => {
  let component: TimeLabelComponent;
  let fixture: ComponentFixture<TimeLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeLabelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
