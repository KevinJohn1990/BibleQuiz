import { Component, OnInit, ElementRef } from '@angular/core';
import { QuizViewModel, eAnswerOption, Quiz } from '../quiz.model';
import { QuizService } from './quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chapter } from 'src/app/chapter/chapter.model';
import { ChapterService } from 'src/app/chapter/chapter.service';
import { UtilService } from 'src/app/utils/util.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss', '../../utils/shared.scss'],
})
export class QuizPage {
  bEnableEdit: boolean = false;
  isAuth: boolean = false;
  isLoading: boolean = false;
  quizSet: QuizViewModel[] = [];
  chapter: Chapter = null;
  currentIndex: number = 0;
  headerTitle: string = 'Quiz';
  quizCompleted: boolean = false;

  correctCount: number = 0;
  totalQuestions: number = 0;
  constructor(
    private quizService: QuizService,
    private chapterService: ChapterService,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilService,
    private ref: ElementRef,
    private authService: AuthService
  ) {}

  private activatedRouteSubs: Subscription = null;
  private quizSubs: Subscription = null;
  private chapterSubs: Subscription = null;

  chapterKey: string = '';
  ionViewWillEnter() {
    console.log(this.ref);
    this.isAuth = this.authService.isAuthenticated();
    this.isLoading = true;
    this.activatedRouteSubs = this.activatedRoute.paramMap.subscribe(
      (param) => {
        if (param.has('chapterKey')) {
          const chapterKey = param.get('chapterKey');
          this.chapterKey = chapterKey;

          this.chapterSubs = this.chapterService
            .getChapter(chapterKey)
            .subscribe({
              next: (chapter) => {
                this.chapter = chapter;
                if (chapter != null) {
                  this.headerTitle = 'Quiz : ' + this.chapter.title;
                }
              },
              error: (err) => {
                console.log('Chapter fetch err', err);
              },
            });

          this.quizSubs = this.quizService
            .getQuizByChapter(chapterKey)
            .subscribe({
              next: (quizSet) => {
                this.quizSet = quizSet;
                console.log('quizset:', this.quizSet);
                this.isLoading = false;
              },
              error: (err) => {
                console.log('Quiz set fetch err:', err);
                this.isLoading = false;
              },
            });
        } else {
          this.isLoading = false;
        }
      },
      (err) => {
        console.log('param fetch err: ', err);
        this.isLoading = false;
      }
    );
  }

  showPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      return;
    }
  }
  showNext() {
    if (
      !this.bEnableEdit &&
      this.quizSet[this.currentIndex].selectedOption == null
    ) {
      //pls select answer first
      // show toast;
      this.utilService.presentToast('Kindly select one option');
      return;
    }
    if (this.currentIndex < this.quizSet.length - 1) {
      this.currentIndex += 1;
      return;
    }
    if (this.currentIndex == this.quizSet.length - 1) {
      // evalutate results
      console.log('evaluating....');
      this.evaluateResults();
      return;
    }
  }
  tryagain() {
    this.quizSet.forEach((q) => {
      q.selectedOption = null;
    });
    this.currentIndex = 0;
    this.correctCount = 0;
    this.totalQuestions = this.quizSet.length;
    this.quizCompleted = false;
  }

  addQuiz() {
    const quiz: Quiz = {
      id: this.quizSet.length + 1,
      seqId: this.quizSet.length + 1,
      correctOption: eAnswerOption.optionA,
      optionA: 'optionA',
      optionB: 'optionB',
      optionC: 'optionC',
      optionD: 'optionD',
      question: 'Question',
      description: '',
    };
    this.quizService
      .addQuiz(this.chapterKey, quiz)
      .then((res) => this.utilService.presentToast('Blank quiz question added'))
      .catch((err) => this.utilService.presentToast('Add failed,' + err));
  }

  private evaluateResults() {
    this.correctCount = 0;
    this.totalQuestions = this.quizSet.length;
    this.quizSet.forEach((q) => {
      if (q.correctOption == q.selectedOption) {
        this.correctCount += 1;
      }
    });
    this.quizCompleted = true;
    let percent: number = Math.round(
      (this.correctCount / this.totalQuestions) * 100
    );
    let msg: string = '';
    msg = `You have got a score of ${this.correctCount} out of ${this.totalQuestions}\n`;
    if (percent > 90) {
      msg = msg + `Excellent - Keep it up\n`;
    } else if (percent > 75) {
      msg = msg + `Very Good\n`;
    } else {
      msg = msg + `Good attempt - Keep trying`;
    }
    console.log(percent);
    console.log(this.ref.nativeElement);
    let elRemarks = this.ref.nativeElement.querySelector('.QuizPage .Remarks');
    console.log(elRemarks);
    elRemarks.innerText = msg;
  }

  optionSelected(e) {
    if (this.currentIndex < 0 || this.currentIndex >= this.quizSet.length) {
      console.log('Current Index invalid:', this.currentIndex);
      return;
    }
    const id = e.target.id;
    switch (id) {
      case 'optionA':
        console.log('id:', e.target.id);
        this.quizSet[this.currentIndex].selectedOption = eAnswerOption.optionA;
        break;
      case 'optionB':
        console.log('id:', e.target.id);
        this.quizSet[this.currentIndex].selectedOption = eAnswerOption.optionB;
        break;
      case 'optionC':
        console.log('id:', e.target.id);
        this.quizSet[this.currentIndex].selectedOption = eAnswerOption.optionC;
        break;
      case 'optionD':
        console.log('id:', e.target.id);
        this.quizSet[this.currentIndex].selectedOption = eAnswerOption.optionD;
        break;
      default:
        break;
    }
  }

  ionViewWillLeave() {
    this.utilService.unSubscribeSubscription(this.activatedRouteSubs);
    this.utilService.unSubscribeSubscription(this.quizSubs);
    this.utilService.unSubscribeSubscription(this.chapterSubs);
  }
}
