import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TimerService } from '../../service/timer.service';
import { getCount, TimerState } from '../../store/selectors';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';
import * as Actions from './../../store/actions';
import { getTimer } from './../../store/actions';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopwatchComponent implements OnInit, OnDestroy {
  @Input() controls: TimerControlsComponent;

  time$ = this.store.select(getCount);

  subscription$: Subscription;

  constructor(private cd: ChangeDetectorRef, private timerService: TimerService, private store: Store<TimerState>) { }

  ngOnInit() {
    this.store.dispatch(getTimer(0, 10));
    this.resetTimer();

    this.subscription$ = this.timerService.stopwatchReset$.subscribe(() => {
      this.resetTimer();
      this.timerService.stop();
      this.cd.markForCheck();
    });
  }

  resetTimer() {
    this.store.dispatch(Actions.resetStopWatch());
  }

  ngOnDestroy() {
    if (this.subscription$) {this.subscription$.unsubscribe();}
  }
}
