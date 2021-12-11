import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TimerService } from '../service/timer.service';
import { TimeActionTypes, setStopWatch, setTime } from './../store/actions';


@Injectable()
export class TimerEffects {

    constructor(
        private actions$: Actions,
        private timerService: TimerService
    ) { }
    
   

}