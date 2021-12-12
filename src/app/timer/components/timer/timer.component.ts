import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimerService } from '../../service/timer.service';
import { getTime, TimerState } from '../../store/selectors';
import * as Actions from './../../store/actions';
import { getTimer } from './../../store/actions';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() active: boolean;

  time$ = this.store.select(getTime);
  percent$: Observable<number>;

  startTime: number = 5 + 1000 * 60 * 5;

  subscriptionReset$: Subscription;

  constructor(private timerService: TimerService, private store: Store<TimerState>) { }

  ngOnInit() {
    this.store.dispatch(getTimer(0, 10));
    this.subscriptionReset$ = this.timerService.timerReset$.subscribe(() => {
      this.resetTimer(this.startTime);
      this.timerService.stop();
    });
  }

  resetTimer(startTime: number) {
    this.timerService.reset$.next();
    this.timerService.end(false);
    this.store.dispatch(Actions.getTime(this.active, this.startTime));
    this.percent$ = this.time$.pipe(
      map(time => (1 - time / startTime) * 100),
    );
  }

  setTime(startTime: number) {
    this.startTime = startTime;
    this.resetTimer(this.startTime);
  }

  ngOnDestroy() {
    if(this.subscriptionReset$) {this.subscriptionReset$.unsubscribe();}
  }

}
