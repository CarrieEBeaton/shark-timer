import { createAction } from "@ngrx/store";

export enum TimeActionTypes {
    getTime = '[Time] Get Time',
    setTime = '[Time] Set Time',
    getStopWatch = '[StopWatch] Get Time',
    setStopWatch = '[StopWatch] Set Time',
    resetStopWatch = '[StopWatch] Reset Time',
}

export const getTime = createAction(
    TimeActionTypes.getTime,
    (active: boolean, startTime: number) => ({active, startTime})
);

export const setTime = createAction(
    TimeActionTypes.setTime,
    (time: number) => ({time})
);

export const getStopWatch = createAction(
    TimeActionTypes.getStopWatch,
);

export const setStopWatch = createAction(
    TimeActionTypes.setStopWatch,
    (count: number) => ({count})
);

export const resetStopWatch = createAction(
    TimeActionTypes.resetStopWatch
);