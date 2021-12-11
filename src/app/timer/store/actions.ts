import { createAction } from "@ngrx/store";

export enum TimeActionTypes {
    getTime = '[Time] Get Time',
    setTime = '[Time] Set Time',
}

export const getTime = createAction(
    TimeActionTypes.getTime,
    (active: boolean, startTime: number) => ({active, startTime})
);

export const setTime = createAction(
    TimeActionTypes.setTime,
    (time: number) => ({time})
);