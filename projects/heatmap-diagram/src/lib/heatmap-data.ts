/**
 * Interface an emission needs to provide
 */
export interface HeatmapData {
    startTime: Date;
    endTime: Date;
    /** Labels to show for each bucket in entire need to have the same order as `TimeSlice.buckets` in `entries` */
    labels: Label[];
    entries: TimeSlice[];
}

export interface Label {
    name: string;
}

/**
 * Represents a Slice of Time (a snapshot the values at a specific time) to be shown in the diagram
 */
export interface TimeSlice {
    /** Values, need to have the same order as `HeatmapData.labels` */
    buckets: Bucket[];
    /**
     * What label to show on the time-axis
     * If not set this get's auto-calculated via `startTime` and `endTime` in `HeatmapData`
     */
    timeLabel?: string;
}

/**
 * Atomic value of diagram
 */
export interface Bucket {
    value: number;
    label?: string;
}
