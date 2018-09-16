// Type Errors
export const InvaidDataParameterError = TypeError(`'data' parameter is not set or not an 'Observable'`);
export const InvalidEntriesError = TypeError(`'entries' property in the 'HeatmapData' needs to be set and an Array`);
export const StartOrEndTimeInvalidError = TypeError(`'endTime' and/or 'startTime' are not valid 'Date' objects`);

// Range Errors
export const EndBeforeStartTimeError = RangeError(`'endTime' can't be before 'startTime'`);
