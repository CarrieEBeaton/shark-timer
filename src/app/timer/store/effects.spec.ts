import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from "@ngrx/store/testing";
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from "rxjs";
import { TimerService } from "../service/timer.service";
import { getStopWatch, getTime, setStopWatch, setTime, setInterval, getTimer } from "./actions";
import { TimerEffects } from "./effects";

describe('TimerEffects', () => {
    let actions: Observable<any>;
    let effects: TimerEffects;
    let service: TimerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                TimerEffects,
                TimerService,
                provideMockStore(),
                provideMockActions(() => actions)]
        })
        effects = TestBed.inject(TimerEffects);
        service = TestBed.inject(TimerService);
        actions = TestBed.inject(Actions);
    });

    it('should initialize effects', () => {
        expect(effects).toBeTruthy();
    });

    it('should set time on getTime call', () => {
        let timer = 3000;
        spyOn(service, 'setTime').and.returnValue(
            of(timer)
        );

        //Act
        const action = getTime(true, timer);
        const result = setTime(timer);
        actions = hot('-a--', { a: action });
        const expected = cold('-(b)', { b: result });
        //Assert
        expect(effects. getTime$).toBeObservable(expected);
    });

    it('should set stopwatch on getStopWatch call', () => {
        let timer = 3000;
        spyOn(service, 'setStopWatch').and.returnValue(
            of(timer)
        );

        //Act
        const action = getStopWatch();
        const result = setStopWatch(timer);
        actions = hot('-a--', { a: action });
        const expected = cold('-(b)', { b: result });
        //Assert
        expect(effects.getStopwatch$).toBeObservable(expected);
    });

    
    it('should set Interval on setInterval call', () => {
        let dueTimer = 3000;
        let periodScheduler = 3000;
        let interval = 6000;
        spyOn(service, 'setInterval').and.returnValue(
            of(interval)
        );

        //Act
        const action = getTimer(dueTimer, periodScheduler);
        const result = setInterval(interval);
        actions = hot('-a--', { a: action });
        const expected = cold('-(b)', { b: result });
        //Assert
        expect(effects.getInterval$).toBeObservable(expected);
    });

});
