import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MaterialModule } from '../../../material/material.module';
import { TimeDisplayComponent } from './time-display.component';

describe('TimeDisplayComponent', () => {
    let component: TimeDisplayComponent;
    let fixture: ComponentFixture<TimeDisplayComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TimeDisplayComponent],
            imports: [MaterialModule, FormsModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeDisplayComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call startSetTime when clicked', () => {
        let setStart = spyOn(component, 'startSetTime');
        let setStartTime = debugElement.query(By.css('#startSetTime')).nativeElement;
        setStartTime.click();
        fixture.detectChanges();
        expect(setStart).toHaveBeenCalled();
    });
});
