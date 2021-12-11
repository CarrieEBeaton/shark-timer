import { createReducer, on } from '@ngrx/store';
import * as Actions from './actions';
import { TimerState } from './selectors';

export const initialState: TimerState = {
    time: 0
};

export const timerReducer = createReducer(
    initialState,
    on(Actions.setTime, (state, payload) => ({ ...state, time: payload.time })),
);

export const timerFeatureKey = 'timer';