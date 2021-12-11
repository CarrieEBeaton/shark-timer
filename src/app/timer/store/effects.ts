import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { TimerService } from '../service/timer.service';
import { TimeActionTypes, setTime, setStopWatch, setInterval } from './../store/actions';

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

    getInterval$ = createEffect(() => this.actions$.pipe(
        ofType(TimeActionTypes.getTimer),
        mergeMap((props) => {
            return this.timerService.setInterval(props['dueTimer'], props['periodScheduler']).pipe(
                map(interval => setInterval(interval)),
                catchError(() => EMPTY)
            )
        })
    ));

    stopWatchReset$ = createEffect(
        () => this.actions$.pipe(
          ofType(TimeActionTypes.resetStopWatch),
          tap(() => {
              this.timerService.stop();
              this.timerService.stopWatchReset();
            })
        ),
        { dispatch: false }
      );

}