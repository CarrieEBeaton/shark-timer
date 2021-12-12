import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimerService } from '../../service/timer.service';
import * as Actions from './../../store/actions';
import { TimerState } from './../../store/selectors';

@Component({
  selector: 'app-timer-controls',
  templateUrl: './timer-controls.component.html',
  styleUrls: ['./timer-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerControlsComponent implements OnInit {
  @ViewChild('alarm', { static: true }) alarmElementRef: ElementRef;
  @Input() timerActive: boolean;

  alarm: HTMLAudioElement;
  constructor(private timerService: TimerService, private store: Store<TimerState>) { }

  ngOnInit() {
    this.alarm = this.alarmElementRef.nativeElement;
  }

  startStop() {
    if (this.timerActive) {
      if (!this.timerService.timerEnd$.value) {
        this.timerService.timerStart();
      } else {
        this.stopAlarm();
      }
    } else {
      this.timerService.stopWatchStart();
      this.store.dispatch(Actions.getStopWatch());
    }
  }

  reset() {
    this.timerService.reset(this.timerActive);
  }

  toggleAlarm() {
    this.timerService.toggleAlarm();
  }

  startAlarm() {
    if (this.timerService.alarmEnabled$.value && !this.timerService.alarmSounding$.value) {
      this.timerService.startAlarm();
      this.alarm.play();
    }
  }

  stopAlarm() {
    if (this.timerService.alarmEnabled$.value && this.timerService.alarmSounding$.value) {
      this.timerService.stopAlarm();
      this.alarm.pause();
    }
  }

  toggleFullscreen() {
    this.timerService.toggleFullscreen();
  }

  get started() {
    return this.timerActive ? this.timerService.timerStart$.value : this.timerService.stopwatchStart$.value;
  }
}
