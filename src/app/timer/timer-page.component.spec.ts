import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MaterialModule } from '../material/material.module';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { TimeDisplayComponent } from './components/time-display/time-display.component';
import { TimerControlsComponent } from './components/timer-controls/timer-controls.component';
import { TimerComponent } from './components/timer/timer.component';
import { TimerService } from './service/timer.service';
import { getCount, getTime } from './store/selectors';
import { TimerPageComponent } from './timer-page.component';

describe('TimerPageComponent', () => {
    let component: TimerPageComponent;
    let fixture: ComponentFixture<TimerPageComponent>;
    let store: MockStore;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TimerPageComponent,
                TimerComponent,
                StopwatchComponent,
                TimerControlsComponent,
                TimeDisplayComponent,
            ],
            imports: [
                MaterialModule,
                FormsModule,
                RouterTestingModule,
                NoopAnimationsModule,
            ],
            providers: [TimerService, provideMockStore()]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerPageComponent);
        store = TestBed.inject(MockStore);
        store.overrideSelector(getTime, 0);
        store.overrideSelector(getCount, 0);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
