import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

import { SaveChapterPage } from './save-chapter.page';

const routes: Routes = [
  {
    path: '',
    component: SaveChapterPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveChapterPageRoutingModule { }
