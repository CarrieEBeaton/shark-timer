import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerPageComponent {
  selectedTabIndex$ = new BehaviorSubject<number>(0);

  tabChange(selectedTabIndex: number) {
    this.selectedTabIndex$.next(selectedTabIndex);
  }
}
