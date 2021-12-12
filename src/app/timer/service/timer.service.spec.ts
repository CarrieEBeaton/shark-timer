import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TimerService } from "./timer.service";

describe('TimerService', () => {
    let service: TimerService;
    let store: MockStore;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          TimerService,
          provideMockStore()
        ]
      });
      service = TestBed.inject(TimerService);
      store = TestBed.inject(MockStore);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should call next when timerStart is called', () => {
        const timerStart = spyOn(service.timerStart$, 'next');
        service.timerStart();
        expect(timerStart).toHaveBeenCalled();
    });

    it('should call next when stopWatchStart is called', () => {
        const stopWatchStart = spyOn(service.stopwatchStart$, 'next');
        service.stopWatchStart();
        expect(stopWatchStart).toHaveBeenCalled();
    });

    it('should call next when stopWatchStart is called', () => {
        const stopReset = spyOn(service.stopReset$, 'next');
        service.stopWatchReset();
        expect(stopReset).toHaveBeenCalled();
    });

    it('should call next for timerStart when timer active and start is called', () => {
        const timerStart = spyOn(service.timerStart$, 'next');
        const stopwatchStart = spyOn(service.stopwatchStart$, 'next');
        service.start(true);
        expect(timerStart).toHaveBeenCalledWith(true);
        expect(stopwatchStart).not.toHaveBeenCalled();
    });

    it('should call next for stopwatchStart when timer is not active and start is called', () => {
        const timerStart = spyOn(service.timerStart$, 'next');
        const stopwatchStart = spyOn(service.stopwatchStart$, 'next');
        service.start(undefined);
        expect(stopwatchStart).toHaveBeenCalledWith(true);
        expect(timerStart).not.toHaveBeenCalled();
    });

    
    it('should call next for timerStart when timer active and stop is called', () => {
        const timerStart = spyOn(service.timerStart$, 'next');
        const stopwatchStart = spyOn(service.stopwatchStart$, 'next');
        service.stop(true);
        expect(timerStart).toHaveBeenCalledWith(false);
        expect(stopwatchStart).not.toHaveBeenCalled();
    });

    it('should call next for stopwatchStart when timer not active and stop is called', () => {
        const timerStart = spyOn(service.timerStart$, 'next');
        const stopwatchStart = spyOn(service.stopwatchStart$, 'next');
        service.stop(undefined);
        expect(stopwatchStart).toHaveBeenCalledWith(false);
        expect(timerStart).not.toHaveBeenCalled();
    });

    it('should call next for timerReset when timer active and stop is called', () => {
        const timerReset = spyOn(service.timerReset$, 'next');
        const stopwatchReset = spyOn(service.stopwatchReset$, 'next');
        const dispatch = spyOn(store, 'dispatch');
        service.reset(true);
        expect(timerReset).toHaveBeenCalledWith(0);
        expect(stopwatchReset).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
    });
    
    it('should call next for stopwatchReset when timer not active and stop is called', () => {
        const timerReset = spyOn(service.timerReset$, 'next');
        const stopwatchReset = spyOn(service.stopwatchReset$, 'next');
        const dispatch = spyOn(store, 'dispatch');
        service.reset(undefined);
        expect(timerReset).not.toHaveBeenCalled();
        expect(stopwatchReset).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalled();
    });

    it('should call next for timerEnd end is called', () => {
        const timerEnd = spyOn(service.timerEnd$, 'next');
        const startAlarm = spyOn(service, 'startAlarm');
        service.end(false);
        expect(timerEnd).toHaveBeenCalled();
        expect(startAlarm).not.toHaveBeenCalled();
    });

    it('should call next for timerEnd end is called and start alarm when timer complete', () => {
        const timerEnd = spyOn(service.timerEnd$, 'next');
        const startAlarm = spyOn(service, 'startAlarm');
        service.end(true);
        expect(timerEnd).toHaveBeenCalled();
        expect(startAlarm).toHaveBeenCalled();
    });

    
    it('should call next for alarmEnabled when toggleAlarm is called', () => {
        const alarmEnabled = spyOn(service.alarmEnabled$, 'next');
        service.toggleAlarm();
        expect(alarmEnabled).toHaveBeenCalled();
    });

    it('should call next for alarmSounding when startAlarm is called', () => {
        const alarmSounding = spyOn(service.alarmSounding$, 'next');
        service.startAlarm();
        expect(alarmSounding).toHaveBeenCalled();
    });

    it('should call next for alarmSounding when startAlarm is called', () => {
        const alarmSounding = spyOn(service.alarmSounding$, 'next');
        service.startAlarm();
        expect(alarmSounding).toHaveBeenCalledWith(true);
    });

    it('should call next for alarmSounding when stopAlarm is called', () => {
        const alarmSounding = spyOn(service.alarmSounding$, 'next');
        service.stopAlarm();
        expect(alarmSounding).toHaveBeenCalledWith(false);
    });

    it('should call next for fullScreen when toggleFullscreen is called', () => {
        const fullScreen = spyOn(service.fullScreen$, 'next');
        service.toggleFullscreen();
        expect(fullScreen).toHaveBeenCalledWith(!service.fullScreen$.value);
    });
});