import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { UtilService } from '../utils/util.service';
import { DashboardInfo, HomeService } from './home.service';
import { QuizService } from '../quiz-list/quiz/quiz.service';
import { QuizViewModel } from '../quiz-list/quiz.model';
import { ChapterService } from '../chapter/chapter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss', '../utils/shared.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  gradeTitle = environment.gradeTitle;
  isAuth = false;
  quizSet: QuizViewModel[] = [];
  private chapterKey = ''; //'-NVwbeeVwx8yWLtM-Jt2';
  private authStateSubs: Subscription = null;
  private authStateSubs2: Subscription = null;
  private quizSubs: Subscription = null;
  private homeSubs: Subscription = null;
  constructor(
    private authService: AuthService,
    private utilService: UtilService,
    private homeService: HomeService,
    private quizService: QuizService,
    private chapterService: ChapterService
  ) {}

  email: string = '';
  headerTitle: string = 'Bible Quiz';
  title: string = '';
  ionViewWillEnter() {
    this.isAuth = this.authService.isAuthenticated();
    this.chapterKey = this.chapterService.getMainQuizChapterKey();
    console.log('key: ', this.chapterKey);
    if (this.chapterKey) {
      this.chapterService.setMainQuizChapterKey(this.chapterKey);
      this.fetchQuiz();
      this.fetchAndSetTitle();
    }
  }
  ngOnInit(): void {
    this.homeSubs = this.homeService.getSubs('1').subscribe({
      next: (res) => {
        console.log('subs res: ', res);
        if (this.chapterKey != res.chapterKey) {
          this.chapterKey = res.chapterKey;
          if (this.chapterKey) {
            this.chapterService.setMainQuizChapterKey(this.chapterKey);
            this.fetchQuiz();
            this.fetchAndSetTitle();
          }
        }
        this.currentIndex = res.currentIndex;
        this.showAnswer = res.showAnswer;
        this.showOptions = res.showOptions;
        this.teamAPoints = res.teamAPoints;
        this.teamBPoints = res.teamBPoints;
      },
      error: (err) => {
        console.error('Err in subs: ', err);
      },
    });
  }

  chapterInfoSubs: Subscription = null;
  fetchAndSetTitle() {
    if (this.chapterInfoSubs !== null) this.chapterInfoSubs.unsubscribe();
    this.title = '';
    this.headerTitle = 'Bible Quiz';
    this.chapterInfoSubs = this.chapterService
      .getChapter(this.chapterKey)
      .subscribe({
        next: (res) => {
          this.title = res.title;
          if (this.title) this.headerTitle = 'Bible Quiz - ' + this.title;
        },
      });
  }

  fetchQuiz() {
    if (this.quizSubs !== null) this.quizSubs.unsubscribe();
    this.quizSubs = this.quizService
      .getQuizByChapter(this.chapterKey)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.quizSet = res;
        },
        error: (err) => console.error('Err in quiz list fetch:', err),
      });
  }
  getChapterKey() {
    var key = this.chapterService.getMainQuizChapterKey();
    this.dInfo.chapterKey = key;
    this.chapterKey = key;
  }
  prevIndexClick() {
    this.dInfo.currentIndex = this.dInfo.currentIndex - 1;
    this.dInfo.showAnswer = false;
    this.dInfo.showOptions = false;
  }
  nextIndexClick() {
    this.dInfo.currentIndex = this.dInfo.currentIndex + 1;
    this.dInfo.showAnswer = false;
    this.dInfo.showOptions = false;
  }
  dInfo = new DashboardInfo();
  currentIndex = -1;
  showAnswer = false;
  showOptions = false;
  teamAPoints = 0;
  teamBPoints = 0;
  updateClick() {
    this.dInfo.chapterKey = this.chapterKey;
    this.homeService.updateDashboard('1', this.dInfo);
  }
  createRange(number) {
    // return new Array(number);
    return new Array(number).fill(0).map((n, index) => index + 1);
  }
  ngOnDestroy() {
    this.utilService.unSubscribeSubscription(this.authStateSubs);
    this.utilService.unSubscribeSubscription(this.authStateSubs2);
    this.utilService.unSubscribeSubscription(this.quizSubs);
    this.utilService.unSubscribeSubscription(this.homeSubs);
  }
}
