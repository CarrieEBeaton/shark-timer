import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subject } from 'rxjs';
import { filter, mapTo, scan, switchMap, takeUntil } from 'rxjs/operators';
import { TimerState } from '../../store/selectors';
import { TimerService } from '../../service/timer.service';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopwatchComponent implements OnInit, OnDestroy {
  @Input() controls: TimerControlsComponent;
  @Input() active: boolean;

  count$: Observable<number>;

  reset$: Subject<void> = new Subject<void>();
  destroyed$: Subject<void> = new Subject<void>();

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

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  resetTimer() {
    this.reset$.next();
    this.count$ = this.timerService.stopwatchStart$.pipe(
      filter(() => this.active),
      switchMap(start => {
        return (start ? this.timerService.interval$.pipe(mapTo(10)) : EMPTY)
      }),
      scan((acc, val) => acc + val, 0),
      takeUntil(this.reset$)
    );
  }

}
