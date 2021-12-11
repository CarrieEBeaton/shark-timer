import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, Observable, Subject, timer } from 'rxjs';
import { filter, map, mapTo, scan, startWith, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { TimerService } from '../../service/timer.service';
import { getTime, TimerState } from '../../store/selectors';

import { TimeDisplayComponent } from '../time-display/time-display.component';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';
import * as Actions from './../../store/actions';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {
  @ViewChild('timeDisplay', {static: true}) timeDisplay: TimeDisplayComponent;
  @Input() controls: TimerControlsComponent;
  @Input() active: boolean;

  time$ = this.store.select(getTime);
  percent$: Observable<number>;
  start$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  startTime: number = 5 + 1000 * 60 * 5;

  constructor(private cd: ChangeDetectorRef, private timerService: TimerService, private store: Store<TimerState>) { }

  ngOnInit() {
    this.timerService.setInterval(0, 10);
    this.timerService.timerReset$.subscribe(() => {
      this.resetTimer(this.startTime);
      this.controls.stop();
      this.cd.markForCheck();
    });

    this.timeDisplay.settingTime$.pipe(
      filter(settingTime => settingTime),
    ).subscribe(() => {
      console.log(this.controls );
      this.controls.stop()});

    this.timerService.timerStart$.pipe(
      filter(start => start),
    ).subscribe(() => this.timeDisplay.endSetTime());

  }

  resetTimer(startTime: number) {
    this.timerService.reset$.next();
    this.controls.end(false);
    this.store.dispatch(Actions.getTime(this.active, this.startTime));
    this.percent$ = this.time$.pipe(
      map(time => (1 - time / startTime) * 100),
    );
  }

  setTime(startTime: number) {
    this.startTime = startTime;
    this.resetTimer(this.startTime);
  }

}
