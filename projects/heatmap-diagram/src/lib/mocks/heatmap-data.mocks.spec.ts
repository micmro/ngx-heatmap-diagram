import { HeatmapData, TimeSlice, Bucket, Label } from '../heatmap-interface';

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
