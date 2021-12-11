import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MaterialModule } from '../../../material/material.module';
import { TimerService } from '../../service/timer.service';
import { TimerControlsComponent } from './timer-controls.component';

describe('TimerControlsComponent', () => {
    let component: TimerControlsComponent;
    let fixture: ComponentFixture<TimerControlsComponent>;
    let store: MockStore;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TimerControlsComponent],
            imports: [MaterialModule],
            providers: [TimerService, provideMockStore()]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerControlsComponent);
        store = TestBed.inject(MockStore);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
