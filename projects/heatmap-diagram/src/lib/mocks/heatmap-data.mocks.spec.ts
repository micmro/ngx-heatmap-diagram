import { HeatmapData, TimeSlice, Bucket, Label } from '../heatmap-interface';
import { HeatmapDataInternal } from '../heatmap-data-internal-interface';

export const heatmapDataFactory = (startTime: Date, endTime: Date, labels: string[] = [], entries: TimeSlice[] = []): HeatmapData => {
  return {
    startTime,
    endTime,
    labels: labels.map(name => ({ name })),
    entries
  };
};

export const getEmptyHeatmapData = (): HeatmapData => {
  const startTime = new Date(2012, 6, 3, 5, 1, 30, 500);
  const endTime = new Date(2012, 6, 3, 5, 2, 35, 500);
  return heatmapDataFactory(startTime, endTime, ['bucket row a', 'bucket row b']);
};

/** 3 TimeSlice with 2 Rows */
export const get3TimeSlice2RowBasicHeatmapData = (): HeatmapData => {
  return makeHeatmapData([[0, 1], [1, 2], [0, 3]]);
};

/** 3 TimeSlice with 2 Rows */
export const get3TimeSlice2RowBasicHeatmapDataInternal = (): HeatmapDataInternal => {
  return makeHeatmapDataInternal([[0, 1], [1, 2], [0, 3]]);
};


/** Genetates one timeslice/min for as may values as inserted */
export const makeHeatmapData = (values: number[][]): HeatmapData => {
  const startTime = new Date(2012, 6, 3, 5, 1, 30);
  const endTime = new Date(2012, 6, 3, 5, values.length, 30);
  const labels: Label[] = values.length > 0
    ? values[0].map((row, rowIndex) => ({ name: `bucket row ${rowIndex}`}))
    : [ {name: 'bucket row a' }, { name: 'bucket row b' } ];
  const entries: TimeSlice[] = values.map((column, columnIndex) => {
    return makeTimeSlice(column.map((bucketValue, rowIndex) => {
      return makeBucket(bucketValue, `buckat-label timeslice${columnIndex} row${rowIndex}`);
    }), `TimeSlice ${columnIndex}`);
  });
  return {
    startTime,
    endTime,
    labels,
    entries
  };
};

export const makeHeatmapDataInternal = (values: number[][]): HeatmapDataInternal => {
  const startTime = new Date(2012, 6, 3, 5, 1, 30);
  const endTime = new Date(2012, 6, 3, 5, values.length, 30);
  const labels: Label[] = values.length > 0
    ? values[0].map((row, rowIndex) => ({ name: `bucket row ${rowIndex}`}))
    : [ {name: 'bucket row a' }, { name: 'bucket row b' } ];
  const entries: TimeSlice[] = values.map((column, columnIndex) => {
    return makeTimeSlice(column.map((bucketValue, rowIndex) => {
      return makeBucket(bucketValue, `buckat-label timeslice${columnIndex} row${rowIndex}`);
    }), `TimeSlice ${columnIndex}`);
  });

  const extremes = values.reduce((acc, val) => {
    val.forEach(v => {
      if (acc.min === undefined) {
        acc.min = v;
        acc.max = v;
      }
      acc.min = Math.min(acc.min, v);
      acc.max = Math.max(acc.max, v);
    });
    return acc;
  }, {
    min: undefined, max: undefined
  } as { min: number, max: number });

  return {
    startTime,
    endTime,
    labels,
    entries,
    maxValue: extremes.max,
    minValue: extremes.min,
    colors: [
      {r: 0, g: 255, b: 0, a: 0},
      {r: 127, g: 128, b: 0, a: 0},
      {r: 255, g: 0, b: 0, a: 0}
    ]
  };
};

/** Helper to quickly generate a `TimeSlice` */
export const makeTimeSlice = (buckets: Bucket[], timeLabel?: string): TimeSlice => ({
  buckets,
  timeLabel
});

/** Helper to quickly generate a `Bucket` */
export const makeBucket = (value: number, label: string = 'a bucket-label'): Bucket => ({
  value,
  label
});
