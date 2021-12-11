import { getStopWatch, getTime, getTimer, resetStopWatch } from "./actions";
import * as fromReducers from './reducers';
import { TimerState } from "./selectors";

describe('Timer Reducer', () => {
 
    it('should set the time on the reducer', () => {
      let timer = 3000;
      const newState: TimerState = {
        time: timer,
        count: 0,
        interval: 0
      };
    
      const action = getTime(true, timer);
      const state = fromReducers.timerReducer(newState, action);
  
      expect(state).toEqual(newState);
    });

    it('should set the count on the reducer', () => {
        let count = 3000;
        const newState: TimerState = {
          time: 0,
          count: count,
          interval: 0
        };
      
        const action = getStopWatch();
        const state = fromReducers.timerReducer(newState, action);
    
        expect(state).toEqual(newState);
      });

      it('should set the interval on the reducer', () => {
        let interval = 0;
        const newState: TimerState = {
          time: 0,
          count: 0,
          interval: interval
        };
      
        const action = getTimer(20, 30);
        const state = fromReducers.timerReducer(newState, action);
    
        expect(state).toEqual(newState);
      });

      it('should resetStopWatch on the reducer', () => {
        const newState: TimerState = {
          time: 0,
          count: 0,
          interval: 0
        };
        const setTimeAction = getTime(true, 5000);
        fromReducers.timerReducer(newState, setTimeAction);

        const action = resetStopWatch();
        const state = fromReducers.timerReducer(newState, action);
    
        expect(state).toEqual(newState);
      });
  
});