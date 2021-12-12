import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MaterialModule } from '../../../material/material.module';
import { TimerService } from '../../service/timer.service';
import { TimerControlsComponent } from './timer-controls.component';

describe('TimerControlsComponent', () => {
    let component: TimerControlsComponent;
    let fixture: ComponentFixture<TimerControlsComponent>;
    let store: MockStore;
    let debugElement: DebugElement;

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
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should click reset', () => {
        let reset = spyOn(component, 'reset');
        let resetButton = debugElement.query(By.css('.reset-button')).nativeElement;
        resetButton.click();
        fixture.detectChanges();
        expect(reset).toHaveBeenCalled();
    });

    it('should click startStop', () => {
        let startStop = spyOn(component, 'startStop');
        let startButton = debugElement.query(By.css('.start-button')).nativeElement;
        startButton.click();
        fixture.detectChanges();
        expect(startStop).toHaveBeenCalled();
    });
});
