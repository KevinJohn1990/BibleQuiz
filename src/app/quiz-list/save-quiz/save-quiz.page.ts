import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/utils/util.service';
import { Quiz } from '../quiz.model';
import { QuizService } from '../quiz/quiz.service';

@Component({
  selector: 'app-save-quiz',
  templateUrl: './save-quiz.page.html',
  styleUrls: ['./save-quiz.page.scss', '../../utils/shared.scss'],
})
export class SaveQuizPage {
  isLoading: boolean = false;
  headerTitle: string = '';
  QuizGroup: FormGroup;

  private quiz: Quiz = new Quiz();
  private chapterKey: string = '';
  private quizKey: string = '';

  // subscription
  private activatedRouteSubs: Subscription | null = null;
  private quizSubs: Subscription | null = null;

  constructor(
    private utilService: UtilService,
    private quizService: QuizService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) {
    this.QuizGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      seqId: new FormControl('', []),
      question: new FormControl('', [Validators.required]),
      correctOption: new FormControl('', [Validators.required]),
      optionA: new FormControl('', [Validators.required]),
      optionB: new FormControl('', [Validators.required]),
      optionC: new FormControl('', [Validators.required]),
      optionD: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.activatedRouteSubs = this.activatedRoute.paramMap.subscribe(
      (params) => {
        if (params.has('chapterKey') && params.has('quizKey')) {
          this.chapterKey = params.get('chapterKey') || '';
          this.quizKey = params.get('quizKey') || '';
          console.log('chk: ', this.chapterKey);
          console.log('qk: ', this.quizKey);
          this.quizSubs = this.quizService
            .getQuiz(this.chapterKey, this.quizKey)
            .subscribe({
              next: (data) => {
                const quiz: Quiz = data;
                console.log('quiz,', quiz);
                this.setQuizGroup(quiz);
                this.headerTitle = 'Edit Quiz: ' + quiz.id;
                this.isLoading = false;
              },
              error: (err) => {
                console.log('err:', err);
                this.isLoading = false;
              },
            });
        } else {
          this.isLoading = false;
          console.log('keys were not found');
        }
      }
    );
  }

  ionViewWillLeave() {
    this.utilService.unSubscribeSubscription(this.activatedRouteSubs);
    this.utilService.unSubscribeSubscription(this.quizSubs);
  }

  get question() {
    return this.QuizGroup.get('question');
  }

  get correctOption() {
    return this.QuizGroup.get('correctOption');
  }

  get optionA() {
    return this.QuizGroup.get('optionA');
  }

  get optionB() {
    return this.QuizGroup.get('optionB');
  }

  get optionC() {
    return this.QuizGroup.get('optionC');
  }

  get optionD() {
    return this.QuizGroup.get('optionD');
  }
  get description() {
    return this.QuizGroup.get('description');
  }
  save() {
    const quiz: Quiz = this.getQuizFromScreen();
    if (this.validateQuiz(quiz) == false) {
      return;
    }
    this.quizService
      .updateQuiz(this.chapterKey, this.quizKey, quiz)
      .then((res: any) => {
        this.utilService.presentToast('Update successful');
        // this.navCtrl.pop();
      })
      .catch((err: any) =>
        this.utilService.presentToast('Update failed, ' + err)
      );
  }

  private validateQuiz(quiz: Quiz): boolean {
    if (this.utilService.isNullOrEmpty(quiz.id)) {
      this.utilService.presentToast('Kindly enter id');
      return false;
    }
    if (this.utilService.isNumeric(quiz.id) == false) {
      this.utilService.presentToast('Id should be numeric');
      return false;
    }
    if (this.utilService.isNullOrEmpty(quiz.question)) {
      this.utilService.presentToast('Kindly enter question');
      return false;
    }
    if (this.utilService.isNullOrEmpty(quiz.correctOption)) {
      this.utilService.presentToast('Kindly enter correct option');
      return false;
    }
    if (this.utilService.isNullOrEmpty(quiz.optionA)) {
      this.utilService.presentToast('Kindly enter optionA');
      return false;
    }
    if (this.utilService.isNullOrEmpty(quiz.optionB)) {
      this.utilService.presentToast('Kindly enter optionB');
      return false;
    }
    if (this.utilService.isNullOrEmpty(quiz.optionC)) {
      this.utilService.presentToast('Kindly enter optionC');
      return false;
    }
    if (this.utilService.isNullOrEmpty(quiz.optionD)) {
      this.utilService.presentToast('Kindly enter optionD');
      return false;
    }
    return true;
  }

  private getQuizFromScreen(): Quiz {
    let quiz: Quiz = this.quiz;

    quiz.id = parseInt(this.QuizGroup.get('id')?.value);
    quiz.seqId = this.QuizGroup.get('seqId')?.value;
    quiz.question = this.QuizGroup.get('question')?.value;
    quiz.correctOption = this.QuizGroup.get('correctOption')?.value;
    quiz.optionA = this.QuizGroup.get('optionA')?.value;
    quiz.optionB = this.QuizGroup.get('optionB')?.value;
    quiz.optionC = this.QuizGroup.get('optionC')?.value;
    quiz.optionD = this.QuizGroup.get('optionD')?.value;
    quiz.description = this.QuizGroup.get('description')?.value;

    return quiz;
  }

  private setQuizGroup(quiz: Quiz) {
    this.quiz = quiz;
    this.QuizGroup.setValue({
      id: quiz.id,
      seqId: quiz.seqId ? quiz.seqId : quiz.id,
      question: quiz.question,
      correctOption: quiz.correctOption,
      optionA: quiz.optionA,
      optionB: quiz.optionB,
      optionC: quiz.optionC,
      optionD: quiz.optionD,
      description: quiz.description,
    });
  }
}
