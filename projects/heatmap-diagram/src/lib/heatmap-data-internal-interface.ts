import { RGBA } from './services/color-mapper-interface';
import { HeatmapData, TimeSlice, Bucket } from './heatmap-interface';

export interface HeatmapDataInternal extends HeatmapData {
  entries: TimeSliceInternal[];
  colors: RGBA[];
  minValue: number;
  maxValue: number;
}

export interface TimeSliceInternal extends TimeSlice {
  buckets: BucketInternal[];
}

export interface BucketInternal extends Bucket {
  /** Color CSS string */
  color: string;

}
