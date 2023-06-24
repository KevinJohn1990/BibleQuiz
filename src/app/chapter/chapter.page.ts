import { Component } from '@angular/core';
import { Chapter } from './chapter.model';
import { ChapterService } from './chapter.service';
import { Subscription } from 'rxjs';

import { UtilService } from '../utils/util.service';
import { AuthService } from '../auth/auth.service';
import { KNavInfo } from '../kcomponents/knav/knavInfo.model';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss', '../utils/shared.scss'],
})
export class ChapterPage {
  searchText: string = '';

  // Navigation params
  pageInterval: number = 5;
  total: number = 20;
  bShowPagination: boolean = true;
  startIndex: number = 1;
  endIndex: number = this.pageInterval;
  // Navigation params ....

  chapters: Chapter[] = [];
  isLoading: boolean = true;

  // Subscription
  private chaptersSearchSubs: Subscription | null = null;
  private chapterTotCntSubs: Subscription | null = null;
  constructor(
    private chapterService: ChapterService,
    private utilService: UtilService,
    private authService: AuthService
  ) {}

  isAuth: boolean = false;
  ionViewWillEnter() {
    this.isLoading = true;
    console.log('Enter');
    this.isAuth = this.authService.isAuthenticated();
    this.pageInterval = this.utilService.getMaxEntriesPerPage();
    // console.log("Interval:", this.pageInterval);
    if (this.startIndex == 1) {
      this.endIndex = this.pageInterval;
    }
    // this.startIndex = 1;
    this.chapterTotCntSubs = this.chapterService
      .getTotalChapterCount()
      .subscribe({
        next: (val) => {
          this.total = val;
          if (this.bShowPagination) {
            this.getChapters(this.searchText, this.startIndex, this.endIndex);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log('Total fetch err:', err);
          this.isLoading = false;
        },
      });
  }

  getChapters(text: string, start: number, end: number) {
    // console.log($event);
    this.searchText = text;
    start = start - 1;
    // end = end - 1
    console.log('start:', start);
    console.log('end:', end);
    let search = '';
    this.bShowPagination = true;
    if (this.utilService.isNullOrEmpty(this.searchText) == false) {
      search = this.searchText;
      this.bShowPagination = false;
    }

    this.isLoading = true;
    this.utilService.unSubscribeSubscription(this.chaptersSearchSubs);
    this.chaptersSearchSubs = this.chapterService
      .getChaptersWithSearch(start, end, search)
      .subscribe({
        next: (data) => {
          console.log('Data:', data);
          this.isLoading = false;
          this.chapters = data as Chapter[];
        },
        error: (err) => {
          console.log('Err:', err);
          this.chapters = [];
          this.isLoading = false;
        },
      });
  }

  navOutput(nav: KNavInfo) {
    if (!(this.startIndex == nav.from)) {
      this.startIndex = nav.from;
      this.endIndex = nav.to;
      this.getChapters(this.searchText, this.startIndex, this.endIndex);
    }
  }

  addNewChapter() {
    const chapter: Chapter = {
      id: this.total + 1,
      title: 'Title',
      summary: 'Summary',
      memoryVerse: 'Memory Verse',
      memoryVerseRef: 'Memory Verse Ref',
      readingPortion: 'Reading portion',
      key: '',
    };
    this.chapterService
      .addChapter(chapter)
      .then((res: any) => {
        this.utilService.presentToast('New chapter added');
        this.total += 1;
      })
      .catch((err: any) =>
        this.utilService.presentToast('Chapter add failed, ' + err)
      );
  }

  ionViewWillLeave() {
    this.utilService.unSubscribeSubscription(this.chaptersSearchSubs);
    this.utilService.unSubscribeSubscription(this.chapterTotCntSubs);
  }
}
