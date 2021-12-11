import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { TimerService } from '../../service/timer.service';
import * as Actions from './../../store/actions';
import * as fromReducer from './../../store/selectors';

@Component({
  selector: 'app-timer-controls',
  templateUrl: './timer-controls.component.html',
  styleUrls: ['./timer-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerControlsComponent implements OnInit {
  @ViewChild('alarm', {static: true}) alarmElementRef: ElementRef;
  @Input() timerActive: boolean;

  alarm: HTMLAudioElement;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.alarm = this.alarmElementRef.nativeElement;
  }

  startStop() {
    this.timerService.startStop(this.timerActive);
  }

  start() {
    this.timerService.start(this.timerActive);
  }

  stop() {
    this.timerService.stop(this.timerActive);
  }

  reset() {
    this.timerService.reset(this.timerActive);
  }

  end(timerComplete: boolean) {
    this.timerService.end(timerComplete);
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
