import { Injectable, Input } from '@angular/core';
import { HeatmapData } from '../heatmap-interface';
import { StartOrEndTimeInvalidError, EndBeforeStartTimeError, InvalidEntriesError } from '../errors-interface';
import { isArray } from 'util';

@Injectable({
  providedIn: 'root'
})
export class HeatmapDataService {

  constructor() { }

  validateAndFill(input: HeatmapData, maxTimeSlices?: number): HeatmapData {
    this.validateData(input);

    if (maxTimeSlices === undefined || input.entries.length <= maxTimeSlices) {
      return input;
    }
    console.log('validateAndFill', maxTimeSlices, input);
    return this.sliceMaxTime(input, maxTimeSlices);
  }

  private sliceMaxTime(input: HeatmapData, maxTimeSlices: number): HeatmapData {
    const interval = (input.endTime.getTime() - input.startTime.getTime()) / input.entries.length;
    const startTime = new Date(input.endTime.getTime() - (maxTimeSlices * interval));
    const entries = input.entries.slice(0, maxTimeSlices);

    return {
      ...input,
      startTime,
      entries
    };
  }

  /** Throws error if data is invalid */
  private validateData(input: HeatmapData): boolean {
    if (!this.isDate(input.endTime) || !this.isDate(input.startTime)) {
      throw StartOrEndTimeInvalidError;
    }
    if (input.endTime.getTime() < input.startTime.getTime()) {
      throw EndBeforeStartTimeError;
    }
    if (!isArray(input.entries)) {
      throw InvalidEntriesError;
    }
    return true;
  }

  private isDate(mayBeDate: Date): boolean {
    // check `instanceof` but as fallback `toString` to ensure to work accross frames as well
    // see https://siderite.blogspot.com/2012/08/the-perils-of-instanceof-in-javascript.html
    return (mayBeDate as any) instanceof Date || Object.prototype.toString.call(mayBeDate) === '[object Date]';
  }
}
