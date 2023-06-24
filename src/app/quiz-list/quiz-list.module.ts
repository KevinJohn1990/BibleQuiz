import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizListPageRoutingModule } from './quiz-list-routing.module';

import { QuizListPage } from './quiz-list.page';
import { KComponentsModule } from '../kcomponents/kcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizListPageRoutingModule,
    KComponentsModule
  ],
  declarations: [QuizListPage]
})
export class QuizListPageModule {}
