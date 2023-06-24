import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChapterDetailsPage } from "./chapter-details.page";

const routes: Routes = [
  {
    path: "",
    component: ChapterDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChapterDetailsPageRoutingModule {}
