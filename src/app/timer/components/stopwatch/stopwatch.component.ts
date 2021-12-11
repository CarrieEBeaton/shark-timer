import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
export class StopwatchComponent implements OnInit {
  @Input() controls: TimerControlsComponent;

  time$ = this.store.select(getCount);

  constructor(private store: Store<TimerState>) { }

  ngOnInit() {
    this.store.dispatch(getTimer(0, 10));
    this.resetTimer();
  }

  resetTimer() {
    this.store.dispatch(Actions.resetStopWatch());
  }
}
