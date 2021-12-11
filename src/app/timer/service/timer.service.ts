import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, EMPTY, Subject, timer } from "rxjs";
import { filter, mapTo, scan, startWith, switchMap, takeUntil, takeWhile, tap } from "rxjs/operators";
import { getInterval, TimerState } from "../store/selectors";
import * as Actions from './../store/actions';

@Injectable()
export class TimerService {

    timerStart$ = new BehaviorSubject<boolean>(false);
    timerEnd$ = new BehaviorSubject<boolean>(false);
    timerReset$ = new BehaviorSubject<number>(0);

    stopwatchStart$ = new BehaviorSubject<boolean>(false);
    stopwatchReset$ = new Subject<void>();
    stopReset$ = new Subject<void>();

    alarmEnabled$ = new BehaviorSubject<boolean>(true);
    alarmSounding$ = new BehaviorSubject<boolean>(false);

    fullScreen$ = new BehaviorSubject<boolean>(false);
    reset$: Subject<void> = new Subject<void>();

    interval$ = this.store.select(getInterval);
    constructor(private store: Store<TimerState>
    ) { }

    setInterval(dueTimer: number, periodScheduler: number) {
        return timer(dueTimer, periodScheduler);
    }

    timerStart() {
        this.timerStart$.next(!this.timerStart$.value);
    }

    stopWatchStart() {
        this.stopwatchStart$.next(!this.stopwatchStart$.value);
    }

    stopWatchReset() {
        this.stopReset$.next();
    }

    start(timerActive: boolean) {
        if (timerActive) {
            this.timerStart$.next(true);
        } else {
            this.stopwatchStart$.next(true);
        }
    }

    stop(timerActive?: boolean) {
        if (timerActive) {
            this.timerStart$.next(false);
        } else {
            this.stopwatchStart$.next(false);
        }
    }

    reset(timerActive: boolean) {
        if (timerActive) {
            this.timerReset$.next(0);
        } else {
            this.stopwatchReset$.next();
            this.store.dispatch(Actions.resetStopWatch());
        }
    }

    end(timerComplete: boolean) {
        this.timerEnd$.next(timerComplete);
        if (timerComplete) {
            this.startAlarm();
        }
    }

    toggleAlarm() {
        this.alarmEnabled$.next(!this.alarmEnabled$.value);
    }

    startAlarm() {
        this.alarmSounding$.next(true);
    }

    stopAlarm() {
        this.alarmSounding$.next(false);
    }

    toggleFullscreen() {
        this.fullScreen$.next(!this.fullScreen$.value);
    }

    setTime(active: boolean, startTime: number) {
        return this.timerStart$.pipe(
            filter(() => active),
            switchMap(start => (start ? this.interval$.pipe(mapTo(10)) : EMPTY)),
            scan((acc, val) => acc - val, startTime),
            startWith(startTime),
            tap(val => {
                if (val === 0) {
                    this.end(true);
                }
            }),
            takeUntil(this.reset$),
            takeWhile(val => val >= 0),
        );
    }

    setStopWatch() {
        return this.stopwatchStart$.pipe(
            switchMap(start => {
              return (start ? this.interval$.pipe(mapTo(10)) : EMPTY)
            }),
            scan((acc, val) => acc + val, 0),
            takeUntil(this.stopReset$)
          );
    }
}