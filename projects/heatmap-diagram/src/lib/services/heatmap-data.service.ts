import { Injectable, Input } from '@angular/core';
import { HeatmapData, TimeSlice } from '../heatmap-interface';
import { StartOrEndTimeInvalidError, EndBeforeStartTimeError, InvalidEntriesError } from '../errors-interface';
import { isArray } from 'util';
import { ColorMapperService } from './color-mapper.service';
import { HeatmapDataInternal } from '../heatmap-data-internal-interface';

@Injectable({
  providedIn: 'root'
})
export class HeatmapDataService {

  constructor(protected colorMapperService: ColorMapperService) { }

  validateAndFill(
    input: HeatmapData,
    minValueColor: string,
    maxValueColor: string,
    colorSteps: number,
    maxTimeSlices?: number
  ): HeatmapDataInternal {
    this.validateData(input);
    const sizedInput = this.sliceToMatchMaxTimeSlices(input, maxTimeSlices);
    return  this.setColors(sizedInput, minValueColor, maxValueColor, colorSteps);
  }

  /** Cuts off old times if `maxTimeSlices` is set */
  private sliceToMatchMaxTimeSlices(input: HeatmapData, maxTimeSlices: number): HeatmapData {
    if (maxTimeSlices === undefined || input.entries.length <= maxTimeSlices) {
      return input;
    }

    const interval = (input.endTime.getTime() - input.startTime.getTime()) / input.entries.length;
    const startTime = new Date(input.endTime.getTime() - (maxTimeSlices * interval));
    const entries = input.entries.slice(0, maxTimeSlices);

    return {
      ...input,
      startTime,
      entries
    };
  }

  private setColors(input: HeatmapData, minValueColor: string, maxValueColor: string, colorSteps: number): HeatmapDataInternal {
    const extrems = this.maxMin(input.entries);
    const colors = this.colorMapperService.createMap(
      minValueColor,
      maxValueColor,
      colorSteps
    );

    return {
      ...input,
      colors,
      minValue: extrems.min,
      maxValue: extrems.max
    };
  }

  private maxMin(entries: TimeSlice[]): { min: number, max: number } {
    return entries.reduce((acc, curr) => {
        curr.buckets.forEach(b => {
          acc.max = Math.max(acc.max, b.value);
          acc.min = Math.min(acc.min, b.value);
        });
        return acc;
    }, { min: 0, max: 0 });
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
