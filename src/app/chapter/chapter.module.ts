import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChapterPageRoutingModule } from "./chapter-routing.module";

import { ChapterPage } from "./chapter.page";
import { KComponentsModule } from "../kcomponents/kcomponents.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChapterPageRoutingModule,
    KComponentsModule,
  ],
  declarations: [ChapterPage],
})
export class ChapterPageModule {}
