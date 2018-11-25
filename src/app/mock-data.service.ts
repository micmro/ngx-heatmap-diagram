import { Injectable } from '@angular/core';
import { HeatmapData, Label, TimeSlice } from 'heatmap-diagram';
import { Observable, timer } from 'rxjs';
import { map, tap, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() {
   }

   /**
    * Generates random data
    * @param intervalMs - interval (in milliseconds) in which to emit values
    * @param returnHistoricTimeslices = number of historic Timeslices to emit from initial emission
    * @param legendNames - Labels to show (also impacts the number of rows)
    * @param maxTimeSlices - Maximum number of slices to return (e.g. when more aggregate over time)
    */
  getData(
    intervalMs = 5000,
    returnHistoricTimeslices = 20,
    legendNames = ['Group 1', 'Group 2', 'Another Group'],
    maxTimeSlices = 100
  ): Observable<HeatmapData> {
    const initialTimeSliceCount = Math.min(returnHistoricTimeslices, maxTimeSlices);
    const base = this.getBase(legendNames, initialTimeSliceCount, intervalMs);
    return timer(200, intervalMs).pipe(
      tap(i => {
        console.log(`Create mock-data emission No.${i}`);
      }),
      map(i => this.makeNewEmission(base, initialTimeSliceCount + i, intervalMs, maxTimeSlices)),
      share()
    );
  }

  private getBase(legendNames: string[], emissions: number, intervalMs: number): HeatmapData {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - (emissions * intervalMs));
    const labels = legendNames.map(name => ({ name }));
    return {
      startTime,
      endTime,
      labels,
      entries: new Array(emissions - 1)
        .fill(undefined)
        .map((v, i) => this.makeTimeSlice(
          labels,
          `Value ${emissions - (i + 1)}`
        ))
    };
  }

  private makeNewEmission(base: HeatmapData, emissions: number, intervalMs: number, maxTimeSlices: number): HeatmapData {
    let startTime = base.startTime;
    if ( emissions > maxTimeSlices) {
      startTime = new Date(startTime.getTime() - intervalMs);
    }
    base.endTime = new Date();
    base.entries.unshift(this.makeTimeSlice(base.labels, `Value ${emissions}`));
    if (emissions >= 22) {
      base.labels = [
        {
          ...base.labels[0],
          name: 'super long description'
        },
        ...base.labels.slice(1)
      ];
    }
    return {
      ...base
    };
  }

  private makeTimeSlice(legendNames: Label[], timeLabel: string): TimeSlice {
    return {
      buckets: legendNames.map(label => ({
        value: Math.round(Math.random() * 1000),
        label: label.name
      })),
      timeLabel
    };
  }
}
