import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TimerService } from '../service/timer.service';
import { TimeActionTypes, setTime, setStopWatch } from './../store/actions';

@Injectable()
export class TimerEffects {

    constructor(
        private actions$: Actions,
        private timerService: TimerService
    ) { }

    getTime$ = createEffect(() => this.actions$.pipe(
        ofType(TimeActionTypes.getTime),
        mergeMap((props) => {
            return this.timerService.setTime(props['active'], props['startTime'] ).pipe(
                map(time => setTime(time)),
                catchError(() => EMPTY)
            )
        })
    ));

    getStopwatch$ = createEffect(() => this.actions$.pipe(
        ofType(TimeActionTypes.getStopWatch),
        mergeMap(() => {
            return this.timerService.setStopWatch().pipe(
                map(time => setStopWatch(time)),
                catchError(() => EMPTY)
            )
        })
    ));

}