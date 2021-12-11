import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
