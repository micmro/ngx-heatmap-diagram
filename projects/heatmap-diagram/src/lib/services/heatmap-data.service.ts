import { Injectable, Input } from '@angular/core';
import { HeatmapData } from '../heatmap-interface';

@Injectable({
  providedIn: 'root'
})
export class HeatmapDataService {

  constructor() { }

  validateAndFill(input: HeatmapData, maxTimeSlices?: number): HeatmapData {
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
}
