import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerPageComponent } from './pages/timer-page/timer-page.component';

const routes: Routes = [
    { path: '', component: TimerPageComponent, data: { view: 'timer' } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimerRoutingModule { }