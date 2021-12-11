import { TimerState } from './selectors';
import * as fromSelectors from './selectors';

describe('Selectors', () => {

  const initialState: TimerState = {
    time: 30,
    count: 40,
    interval: 50
  };

  it('should select the time', () => {
    expect(fromSelectors.getTime.projector(initialState)).toEqual(initialState.time);
  });

  it('should select the counnt', () => {
    expect(fromSelectors.getCount.projector(initialState)).toEqual(initialState.count);
  });

  it('should select the interval', () => {
    expect(fromSelectors.getInterval.projector(initialState)).toEqual(initialState.interval);
  });
});
