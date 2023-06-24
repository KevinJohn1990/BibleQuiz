import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { QuizListPage } from './quiz-list.page';

const routes: Routes = [
  {
    path: '',
    component: QuizListPage
  },
  {
    path: "quiz/:chapterKey",
    loadChildren: () =>
      import("./quiz/quiz.module").then((m) => m.QuizPageModule),
  },
  {
    path: 'save-quiz/:chapterKey/:quizKey',
    loadChildren: () => import('./save-quiz/save-quiz.module').then(m => m.SaveQuizPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizListPageRoutingModule { }
