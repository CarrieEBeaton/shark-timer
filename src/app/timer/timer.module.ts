import { NgModule } from '@angular/core';
import { TimerComponent } from './components/timer/timer.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { TimerPageComponent } from './pages/timer-page/timer-page.component';
import { TimerControlsComponent } from './components/timer-controls/timer-controls.component';
import { TimeDisplayComponent } from './components/time-display/time-display.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { TimerRoutingModule } from './timer-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        TimerComponent,
        StopwatchComponent,
        TimerPageComponent,
        TimerControlsComponent,
        TimeDisplayComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        TimerRoutingModule
    ]
})
export class TimerModule { }
