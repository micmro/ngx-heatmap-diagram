import { RGBA } from './services/color-mapper-interface';
import { HeatmapData } from './heatmap-interface';

export interface HeatmapDataInternal extends HeatmapData {
  colors: RGBA[];
  minValue: number;
  maxValue: number;
}
