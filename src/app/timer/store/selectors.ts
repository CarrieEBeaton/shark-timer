import { createFeatureSelector, createSelector } from '@ngrx/store';
 
export interface TimerState {
  time: number;
  count: number;
  interval: number;
}

const getTimerFeatureState = createFeatureSelector<TimerState>('timer');

export const getTime = createSelector(
  getTimerFeatureState,
  (state: TimerState) => state.time
);

export const getCount = createSelector(
  getTimerFeatureState,
  (state: TimerState) => state.count
);

export const getInterval = createSelector(
  getTimerFeatureState,
  (state: TimerState) => state.interval
);