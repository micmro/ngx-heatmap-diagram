/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeatmapDataService } from './heatmap-data.service';
import { makeHeatmapData } from '../mocks/heatmap-data.mocks.spec';
import { StartOrEndTimeInvalidError, EndBeforeStartTimeError, InvalidEntriesError } from '../errors-interface';

describe('Service: HeatmapData', () => {
  let service: HeatmapDataService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(HeatmapDataService);
  }));


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('maxTimeSlices works', () => {
    const data = [[1, 2], [0, 2], [1, 0], [1, 1]];
    const input = makeHeatmapData(data);
    const outputEntries = makeHeatmapData(data.slice(0, 2)).entries;
    expect(service.validateAndFill(input, 2)).toEqual({
      startTime: new Date(2012, 6, 3, 5, 3, 0),
      endTime: input.endTime, // same
      labels: input.labels, // same
      entries: outputEntries, // only last 2
    });
  });

  it(`'endTime' before 'startTime' throws 'EndBeforeStartTimeError'`, () => {
    const input = {
      ...makeHeatmapData([[1], [2]]),
      startTime: new Date(2012, 1, 1, 0, 0, 500),
      endTime: new Date(2012, 1, 1, 0, 0, 0)
    };
    expect(() => service.validateAndFill(input)).toThrow(EndBeforeStartTimeError);
  });

  it(`invalid 'startTime' throws 'StartOrEndTimeInvalidError'`, () => {
    const input = {
      ...makeHeatmapData([[1], [2]]),
      startTime: 'not a date' as any,
    };
    expect(() => service.validateAndFill(input)).toThrow(StartOrEndTimeInvalidError);
  });

  it(`empty 'startTime' throws 'StartOrEndTimeInvalidError'`, () => {
    const input = makeHeatmapData([[1], [2]]);
    delete input.startTime;
    expect(() => service.validateAndFill(input)).toThrow(StartOrEndTimeInvalidError);
  });

  it(`invalid 'endTime' throws 'StartOrEndTimeInvalidError'`, () => {
    const input = {
      ...makeHeatmapData([[1], [2]]),
      endTime: 'not a date' as any
    };
    expect(() => service.validateAndFill(input)).toThrow(StartOrEndTimeInvalidError);
  });

  it(`empty 'endTime' throws 'StartOrEndTimeInvalidError'`, () => {
    const input = makeHeatmapData([[1], [2]]);
    delete input.endTime;
    expect(() => service.validateAndFill(input)).toThrow(StartOrEndTimeInvalidError);
  });

  it(`invalid 'entries' throws 'InvalidEntriesError'`, () => {
    const input = {
      ...makeHeatmapData([[1], [2]]),
      entries: 'not an array' as any,
    };
    expect(() => service.validateAndFill(input)).toThrow(InvalidEntriesError);
  });

  it(`empty 'entries' throws 'InvalidEntriesError'`, () => {
    const input = makeHeatmapData([[1], [2]]);
    delete input.entries;
    expect(() => service.validateAndFill(input)).toThrow(InvalidEntriesError);
  });
});
