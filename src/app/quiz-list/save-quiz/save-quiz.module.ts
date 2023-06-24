import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveQuizPageRoutingModule } from './save-quiz-routing.module';

import { SaveQuizPage } from './save-quiz.page';
import { KComponentsModule } from 'src/app/kcomponents/kcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaveQuizPageRoutingModule,
    KComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SaveQuizPage]
})
export class SaveQuizPageModule { }
