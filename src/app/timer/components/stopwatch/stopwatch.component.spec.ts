import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from '../../../material/material.module';
import { TimerService } from '../../service/timer.service';
import { TimeDisplayComponent } from '../time-display/time-display.component';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';
import { StopwatchComponent } from './stopwatch.component';
import { getCount } from '../../store/selectors';

describe('StopwatchComponent', () => {
    let component: StopwatchComponent;
    let fixture: ComponentFixture<StopwatchComponent>;
    let controls: TimerControlsComponent;
    let controlsFixture: ComponentFixture<TimerControlsComponent>
    let store: MockStore;
    // let service: TimerService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [StopwatchComponent, TimeDisplayComponent, TimerControlsComponent],
            imports: [MaterialModule, FormsModule],
            providers: [TimerService, provideMockStore()]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StopwatchComponent);
        component = fixture.componentInstance;
        controlsFixture = TestBed.createComponent(TimerControlsComponent);
        controls = controlsFixture.componentInstance;
        // service = TestBed.inject(TimerService);
        store = TestBed.inject(MockStore);
        store.overrideSelector(getCount, 0);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
