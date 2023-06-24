import { NgModule } from "@angular/core";
import { KheaderComponent } from "./kheader/kheader.component";
import { IonicModule } from "@ionic/angular";
import { KheaderBackComponent } from "./kheader-back/kheader-back.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { KprogressComponent } from './kprogress/kprogress.component';
import { KbuttonComponent } from './kbutton/kbutton.component';
import { KbuttonOutlineComponent } from './kbutton-outline/kbutton-outline.component';
import { KNavComponent } from './knav/knav.component';
import { KsearchComponent } from "./ksearch/ksearch.component";

@NgModule({
  imports: [IonicModule, FormsModule, CommonModule],
  declarations: [
    KheaderComponent,
    KheaderBackComponent,
    KprogressComponent,
    KbuttonComponent,
    KbuttonOutlineComponent,
    KNavComponent,
    KsearchComponent
  ],
  exports: [
    KheaderComponent,
    KheaderBackComponent,
    KprogressComponent,
    KbuttonComponent,
    KbuttonOutlineComponent,
    KNavComponent,
    KsearchComponent
  ],
})
export class KComponentsModule { }
