import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../auth/auth.guard';

import { ChapterPage } from "./chapter.page";

const routes: Routes = [
  {
    path: "",
    component: ChapterPage
  },
  {
    path: "details/:id",
    loadChildren: () =>
      import("./chapter-details/chapter-details.module").then(
        (m) => m.ChapterDetailsPageModule
      ),
  },
  {
    path: 'save-chapter/:id',
    loadChildren: () => import('./save-chapter/save-chapter.module').then(m => m.SaveChapterPageModule),
    canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChapterPageRoutingModule { }
