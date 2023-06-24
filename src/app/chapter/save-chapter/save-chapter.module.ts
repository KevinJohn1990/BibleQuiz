import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveChapterPageRoutingModule } from './save-chapter-routing.module';

import { SaveChapterPage } from './save-chapter.page';
import { KComponentsModule } from 'src/app/kcomponents/kcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaveChapterPageRoutingModule,
    KComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SaveChapterPage]
})
export class SaveChapterPageModule { }
