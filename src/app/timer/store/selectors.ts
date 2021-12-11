import { createFeatureSelector, createSelector } from '@ngrx/store';
 
export interface TimerState {
  time: number;
}

const getTimerFeatureState = createFeatureSelector<TimerState>('timer');

export const getTime = createSelector(
  getTimerFeatureState,
  (state: TimerState) => state.time
);
