/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeatmapDataService } from './heatmap-data.service';
import { makeHeatmapData, makeHeatmapDataInternal } from '../mocks/heatmap-data.mocks.spec';
import { StartOrEndTimeInvalidError, EndBeforeStartTimeError, InvalidEntriesError } from '../errors-interface';
import { HeatmapDataInternal } from '../heatmap-data-internal-interface';

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

    expect(service.validateAndFill(input, '#c00', '#00c', 3, 2)).toEqual(<HeatmapDataInternal>{
      startTime: new Date(2012, 6, 3, 5, 2, 30), // calculated based on slicing
      endTime: input.endTime, // same
      labels: input.labels, // same
      colors: [{ r: 204, g: 0, b: 0, a: 1 }, { r: 102, g: 0, b: 102, a: 1 }, { r: 0, g: 0, b: 204, a: 1 }],
      maxValue: 2,
      minValue: 0,
      entries: [
        {
          buckets: [
            { ...input.entries[0].buckets[0], color: 'rgba(102, 0, 102, 1)' },
            { ...input.entries[0].buckets[1], color: 'rgba(0, 0, 204, 1)' }
          ],
          timeLabel: input.entries[0].timeLabel
        },
        {
          buckets: [
            { ...input.entries[1].buckets[0], color: 'rgba(204, 0, 0, 1)' },
            { ...input.entries[1].buckets[1], color: 'rgba(0, 0, 204, 1)' }
          ],
          timeLabel: input.entries[1].timeLabel
        }
      ] // only last 2
    });
  });

  it('maxTimeSlices works (with makeHeatmapDataInternal mock-factory)', () => {
    const data = [[1, 2], [0, 2], [1, 0], [1, 1]];
    const input = makeHeatmapData(data);
    const colors = [{ r: 204, g: 0, b: 0, a: 1 }, { r: 102, g: 0, b: 102, a: 1 }, { r: 0, g: 0, b: 204, a: 1 }];
    const syntheyicOutput = makeHeatmapDataInternal(data, colors);
    expect(service.validateAndFill(input, '#c00', '#00c', 3, 2)).toEqual(<HeatmapDataInternal>{
      ...syntheyicOutput,
      startTime: new Date(2012, 6, 3, 5, 2, 30), // calculated based on slicing
      entries: syntheyicOutput.entries.slice(0, 2) // only last 2
    });
  });

  it('works with rgba values', () => {
    const data = [[1, 2], [0, 2], [1, 0], [1, 1]];
    const input = makeHeatmapDataInternal(data);
    const outputEntries = makeHeatmapData(data.slice(0, 2)).entries;
    expect(service.validateAndFill(input, 'rgba(255, 0, 90, 0.9)', 'rgba(0, 0, 50, 0.5)', 4, 2)).toEqual(<HeatmapDataInternal>{
      startTime: new Date(2012, 6, 3, 5, 2, 30),
      endTime: input.endTime, // same
      labels: input.labels, // same
      colors: [
        { r: 255, g: 0, b: 90, a: 0.9 },
        { r: 170, g: 0, b: 77, a: 0.8 },
        { r: 85, g: 0, b: 63, a: 0.6 },
        { r: 0, g: 0, b: 50, a: 0.5 }
      ],
      maxValue: input.maxValue,
      minValue: input.minValue,
      entries: [
        {
          buckets: [
            { ...input.entries[0].buckets[0], color: 'rgba(85, 0, 63, 0.6)' },
            { ...input.entries[0].buckets[1], color: 'rgba(0, 0, 50, 0.5)' }
          ],
          timeLabel: input.entries[0].timeLabel
        },
        {
          buckets: [
            { ...input.entries[1].buckets[0], color: 'rgba(255, 0, 90, 0.9)' },
            { ...input.entries[1].buckets[1], color: 'rgba(0, 0, 50, 0.5)' }
          ],
          timeLabel: input.entries[1].timeLabel
        }
      ] // only last 2
    });
  });

  it(`'endTime' before 'startTime' throws 'EndBeforeStartTimeError'`, () => {
    const input = {
      ...makeHeatmapData([[1], [2]]),
      startTime: new Date(2012, 1, 1, 0, 0, 500),
      endTime: new Date(2012, 1, 1, 0, 0, 0)
    };
    expect(() => service.validateAndFill(input, '#f00', '#00f', 3)).toThrow(EndBeforeStartTimeError);
  });

  it(`invalid 'startTime' throws 'StartOrEndTimeInvalidError'`, () => {
    const input = {
      ...makeHeatmapData([[1], [2]]),
      startTime: 'not a date' as any
    };
    expect(() => service.validateAndFill(input, '#f00', '#00f', 3)).toThrow(StartOrEndTimeInvalidError);
  });

  it(`empty 'startTime' throws 'StartOrEndTimeInvalidError'`, () => {
    const input = makeHeatmapData([[1], [2]]);
    delete input.startTime;
    expect(() => service.validateAndFill(input, '#f00', '#00f', 3)).toThrow(StartOrEndTimeInvalidError);
  });

  it(`invalid 'endTime' throws 'StartOrEndTimeInvalidError'`, () => {
    const input = {
      ...makeHeatmapData([[1], [2]]),
      endTime: 'not a date' as any
    };
    expect(() => service.validateAndFill(input, '#f00', '#00f', 3)).toThrow(StartOrEndTimeInvalidError);
  });

  it(`empty 'endTime' throws 'StartOrEndTimeInvalidError'`, () => {
    const input = makeHeatmapData([[1], [2]]);
    delete input.endTime;
    expect(() => service.validateAndFill(input, '#f00', '#00f', 3)).toThrow(StartOrEndTimeInvalidError);
  });

  it(`invalid 'entries' throws 'InvalidEntriesError'`, () => {
    const input = {
      ...makeHeatmapData([[1], [2]]),
      entries: 'not an array' as any
    };
    expect(() => service.validateAndFill(input, '#f00', '#00f', 3)).toThrow(InvalidEntriesError);
  });

  it(`empty 'entries' throws 'InvalidEntriesError'`, () => {
    const input = makeHeatmapData([[1], [2]]);
    delete input.entries;
    expect(() => service.validateAndFill(input, '#f00', '#00f', 3)).toThrow(InvalidEntriesError);
  });
});
