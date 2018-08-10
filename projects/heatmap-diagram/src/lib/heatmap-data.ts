/**
 * Interface an emission needs to provide
 */
export interface HeatmapData {
    startTime: Date;
    endTime: Date;
    /** Lables to show for each bucket in entire need to have the same order as `TimeSlice.buckets` in `entries` */
    lables: Lable[];
    entries: TimeSlice[];
}

export interface Lable {
    name: string;
}

/**
 * Represents a Slice of Time (a snapshot the values at a specific time) to be shown in the diagram
 */
export interface TimeSlice {
    /** Values, need to have the same order as `HeatmapData.lables` */
    buckets: Bucket[];
    /**
     * What lable to show on the time-axis
     * If not set this get's auto-calculated via `startTime` and `endTime` in `HeatmapData`
     */
    timeLable?: string;
}

/**
 * Atomic value of diagram
 */
export interface Bucket {
    value: number;
    lable?: string;
}
