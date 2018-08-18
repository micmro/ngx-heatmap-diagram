import { Injectable } from '@angular/core';
import { HeatmapData, Lable, TimeSlice } from 'heatmap-diagram';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

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
    * @param legendNames - Lables to show (also impacts the number of rows)
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
    return timer(10, intervalMs).pipe(
      map(i => this.makeNewEmission(base, initialTimeSliceCount + i, intervalMs, maxTimeSlices))
    );
  }

  private getBase(legendNames: string[], emissions: number, intervalMs: number): HeatmapData {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - (emissions * intervalMs));
    const lables = legendNames.map(name => ({ name }));
    return {
      startTime,
      endTime,
      lables,
      entries: new Array(emissions - 1)
        .fill(undefined)
        .map((v, i) => this.makeTimeSlice(
          lables,
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
    base.entries.unshift(this.makeTimeSlice(base.lables, `Value ${emissions}`));
    return {
      ...base,

    };
  }

  private makeTimeSlice(legendNames: Lable[], timeLable: string): TimeSlice {
    return {
      buckets: legendNames.map(lable => ({
        value: Math.round(Math.random() * 1000),
        lable: lable.name})
      ),
      timeLable
    };
  }
}
