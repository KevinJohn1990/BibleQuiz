import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

import { SaveQuizPage } from './save-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: SaveQuizPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveQuizPageRoutingModule { }
