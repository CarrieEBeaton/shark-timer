import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimerService } from '../../service/timer.service';
import { getCount, TimerState } from '../../store/selectors';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';
import * as Actions from './../../store/actions';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopwatchComponent implements OnInit {
  @Input() controls: TimerControlsComponent;

  time$ = this.store.select(getCount);

  constructor(private cd: ChangeDetectorRef, private timerService: TimerService, private store: Store<TimerState>) { }

  ngOnInit() {
    this.timerService.setInterval(0, 10);
    this.resetTimer();

    this.timerService.stopwatchReset$.subscribe(() => {
      this.resetTimer();
      this.timerService.stop();
      this.cd.markForCheck();
    });
  }

  resetTimer() {
    this.timerService.stopWatchReset();
    this.store.dispatch(Actions.resetStopWatch());
  }
}
