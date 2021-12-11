import { fakeAsync, flush, TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { TimerService } from "./timer.service";

describe('TimerService', () => {
    let service: TimerService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          TimerService,
          provideMockStore()
        ]
      });
      service = TestBed.inject(TimerService);
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

    it('should call next for timerStart when timer active and stop is called', () => {
        const timerStart = spyOn(service.timerStart$, 'next');
        const stopwatchStart = spyOn(service.stopwatchStart$, 'next');
        service.stop(undefined);
        expect(stopwatchStart).toHaveBeenCalledWith(false);
        expect(timerStart).not.toHaveBeenCalled();
    });

});