import { NgModule } from '@angular/core';
import { TimerComponent } from './components/timer/timer.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { TimerPageComponent } from './timer-page.component';
import { TimerControlsComponent } from './components/timer-controls/timer-controls.component';
import { TimeDisplayComponent } from './components/time-display/time-display.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { TimerRoutingModule } from './timer-routing.module';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromTimer from './store/reducers';
import { TimerService } from './service/timer.service';
import { EffectsModule } from '@ngrx/effects';
import { TimerEffects } from './store/effects';

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
        TimerRoutingModule,
        StoreModule.forFeature(fromTimer.timerFeatureKey, fromTimer.timerReducer),
        EffectsModule.forFeature([TimerEffects])
    ],
    providers: [TimerService]
})
export class TimerModule { }
