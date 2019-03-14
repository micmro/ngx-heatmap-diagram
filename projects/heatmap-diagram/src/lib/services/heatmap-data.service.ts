import { Injectable } from '@angular/core';
import { EndBeforeStartTimeError, InvalidEntriesError, StartOrEndTimeInvalidError } from '../errors-interface';
import { HeatmapDataInternal, TimeSliceInternal } from '../heatmap-data-internal-interface';
import { HeatmapData, TimeSlice } from '../heatmap-interface';
import { RGBA } from './color-mapper-interface';
import { ColorMapperService } from './color-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class HeatmapDataService {
  constructor(protected colorMapperService: ColorMapperService) {}

  validateAndFill(
    input: HeatmapData,
    minValueColor: string,
    maxValueColor: string,
    colorSteps: number,
    maxTimeSlices?: number
  ): HeatmapDataInternal {
    this.validateData(input);
    const sizedInput = this.sliceToMatchMaxTimeSlices(input, maxTimeSlices);
    return this.setColors(sizedInput, minValueColor, maxValueColor, colorSteps);
  }

  /** Cuts off old times if `maxTimeSlices` is set */
  private sliceToMatchMaxTimeSlices(input: HeatmapData, maxTimeSlices: number): HeatmapData {
    if (maxTimeSlices === undefined || input.entries.length <= maxTimeSlices) {
      return input;
    }

    const interval = (input.endTime.getTime() - input.startTime.getTime()) / input.entries.length;
    const startTime = new Date(input.endTime.getTime() - maxTimeSlices * interval);
    const entries = input.entries.slice(0, maxTimeSlices);

    return {
      ...input,
      startTime,
      entries
    };
  }

  private setColors(input: HeatmapData, minValueColor: string, maxValueColor: string, colorSteps: number): HeatmapDataInternal {
    const extremes = this.maxMin(input.entries);
    const colors = this.colorMapperService.createMap(minValueColor, maxValueColor, colorSteps);
    const stepValue = (extremes.max - extremes.min) / (colorSteps - 1);
    return {
      ...input,
      entries: this.colorForEntries(input.entries, colors, extremes.min, stepValue),
      colors,
      minValue: extremes.min,
      maxValue: extremes.max
    };
  }

  colorForEntries(entries: TimeSlice[], colors: RGBA[], minValue: number, stepValue: number): TimeSliceInternal[] {
    const resolveColor = (value: number): string => {
      const color = colors[Math.round((value - minValue) / stepValue)];
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    };
    return entries.map(entry => {
      return {
        ...entry,
        buckets: entry.buckets.map(bucket => {
          return {
            ...bucket,
            label: bucket.label || `${bucket.value}`,
            color: resolveColor(bucket.value)
          };
        })
      };
    });
  }

  private maxMin(entries: TimeSlice[]): { min: number; max: number } {
    return entries.reduce(
      (acc, curr) => {
        curr.buckets.forEach(b => {
          acc.max = Math.max(acc.max, b.value);
          acc.min = Math.min(acc.min, b.value);
        });
        return acc;
      },
      { min: 0, max: 0 }
    );
  }

  /** Throws error if data is invalid */
  private validateData(input: HeatmapData): boolean {
    if (!this.isDate(input.endTime) || !this.isDate(input.startTime)) {
      throw StartOrEndTimeInvalidError;
    }
    if (input.endTime.getTime() < input.startTime.getTime()) {
      throw EndBeforeStartTimeError;
    }
    if (!Array.isArray(input.entries)) {
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
