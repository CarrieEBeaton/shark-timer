import { createReducer, on } from '@ngrx/store';
import * as Actions from './actions';
import { TimerState } from './selectors';

export const initialState: TimerState = {
    time: 0,
    count: 0
};

export const timerReducer = createReducer(
    initialState,
    on(Actions.setTime, (state, payload) => ({ ...state, time: payload.time })),
    on(Actions.setStopWatch, (state, payload) => ({ ...state, count: payload.count })),
    on(Actions.resetStopWatch, (state) => ({ ...state, count: 0 })),
);

export const timerFeatureKey = 'timer';