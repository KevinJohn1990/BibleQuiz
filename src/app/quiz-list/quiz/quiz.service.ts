import { Injectable } from '@angular/core';
import { Quiz, QuizViewModel, eAnswerOption } from '../quiz.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilService } from 'src/app/utils/util.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private jsonFileName: string = this.utilService.getAPIBaseEndpoint() + 'quiz';
  constructor(
    private db: AngularFireDatabase,
    private utilService: UtilService
  ) {}

  getQuizByChapter(chapterKey: string): Observable<QuizViewModel[]> {
    return this.db
      .list<Quiz>(`${this.jsonFileName}/${chapterKey}`, (ref) =>
        ref.orderByChild('id')
      )
      .snapshotChanges()
      .pipe(
        map((questions: any) => {
          return questions.map((question) => {
            const data = question.payload.val();
            var quizModel: QuizViewModel = {
              id: data.id,
              seqId: data.seqId,
              question: data.question,
              correctOption: data.correctOption,
              optionA: data.optionA,
              optionB: data.optionB,
              optionC: data.optionC,
              optionD: data.optionD,
              chapterKey: chapterKey,
              selectedOption: null,
              key: question.key,
            };
            return quizModel;
          }) as QuizViewModel[];
        })
      );
  }

  getQuiz(chapterKey: string, quizKey: string): Observable<QuizViewModel> {
    return this.db
      .object<Quiz>(`${this.jsonFileName}/${chapterKey}/${quizKey}`)
      .valueChanges()
      .pipe(
        map((questions: any) => {
          const data: Quiz = questions;
          var quizModel: QuizViewModel = {
            id: data.id,
            seqId: data.seqId,
            question: data.question,
            correctOption: data.correctOption,
            optionA: data.optionA,
            optionB: data.optionB,
            optionC: data.optionC,
            optionD: data.optionD,
            chapterKey: chapterKey,
            selectedOption: null,
            key: quizKey,
          };
          return quizModel;
        })
      );
  }

  addQuiz(chapterKey: string, quiz: Quiz) {
    return this.db.list(`${this.jsonFileName}/${chapterKey}`).push(quiz);
  }

  updateQuiz(chapterKey: string, quizKey: string, quiz: Quiz) {
    return this.db
      .list(`${this.jsonFileName}/${chapterKey}`)
      .update(quizKey, quiz);
  }

  deleteQuiz(chapterKey: string, quizKey: string) {
    return this.db.list(`${this.jsonFileName}/${chapterKey}`).remove(quizKey);
  }
}
