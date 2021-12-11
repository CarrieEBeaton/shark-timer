import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from '../../../material/material.module';
import { getCount } from '../../store/selectors';
import { TimeDisplayComponentStub, TimerControlsComponentStub } from '../../testing/stubs';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';
import { StopwatchComponent } from './stopwatch.component';

describe('StopwatchComponent', () => {
    let component: StopwatchComponent;
    let fixture: ComponentFixture<StopwatchComponent>;
    let store: MockStore;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                StopwatchComponent, 
                TimeDisplayComponentStub, 
                TimerControlsComponentStub],
            imports: [MaterialModule, FormsModule],
            providers: [provideMockStore()]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StopwatchComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        store.overrideSelector(getCount, 0);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
