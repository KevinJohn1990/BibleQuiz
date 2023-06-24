import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChapterDetailsPageRoutingModule } from "./chapter-details-routing.module";

import { ChapterDetailsPage } from "./chapter-details.page";
import { KComponentsModule } from "src/app/kcomponents/kcomponents.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChapterDetailsPageRoutingModule,
    KComponentsModule,
  ],
  declarations: [ChapterDetailsPage],
})
export class ChapterDetailsPageModule {}
