import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'timer',
    loadChildren: () => import('./timer/timer.module').then(m => m.TimerModule)
  },
  { path: '', redirectTo: '/timer', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
