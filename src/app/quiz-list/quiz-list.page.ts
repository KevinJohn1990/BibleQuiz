import { Component, OnInit } from '@angular/core';
import { Chapter } from '../chapter/chapter.model';
import { ChapterService } from '../chapter/chapter.service';
import { Subscription } from 'rxjs';
import { UtilService } from '../utils/util.service';
import { KNavInfo } from '../kcomponents/knav/knavInfo.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.page.html',
  styleUrls: [
    './quiz-list.page.scss',
    '../utils/shared.scss'
  ],
})
export class QuizListPage {

  searchText: string = "";
  // Pagination start
  bShowPagination: boolean = true;
  pageInterval: number = 5;
  startIndex: number = 1;
  endIndex: number = this.pageInterval;
  total: number = 20;
  // Pagination end
  chapters: Chapter[] = [];
  isLoading: boolean = true;
  // Subscription
  private chaptersCntSubs: Subscription = null;
  private chaptersSearchSubs: Subscription = null;
  constructor(
    private chapterService: ChapterService,
    private utilService: UtilService
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.pageInterval = this.utilService.getMaxEntriesPerPage();
    if (this.startIndex == 1) {
      this.endIndex = this.pageInterval;
    }
    this.chaptersCntSubs = this.chapterService.getTotalChapterCount()
      .subscribe(val => {
        this.total = val;
        if (this.bShowPagination) {
          this.getChapters(this.searchText,this.startIndex, this.endIndex);
        }
      }, err => {
        console.log("Chp count fetch err:", err);
      })
  }

  getChapters(text, start, end) {
    this.searchText = text;
    start = start - 1
    // end = end - 1
    console.log("start:", start);
    console.log("end:", end);
    let search = ""
    this.bShowPagination = true;
    if (this.utilService.isNullOrEmpty(this.searchText) == false) {
      search = this.searchText;
      this.bShowPagination = false;
    }

    this.isLoading = true;
    this.utilService.unSubscribeSubscription(this.chaptersSearchSubs);
    this.chaptersSearchSubs = this.chapterService.getChaptersWithSearch(start, end, search)
      .subscribe(data => {
        console.log("Data:", data);
        this.isLoading = false;
        this.chapters = data as Chapter[];
      }, err => {
        console.log("Err:", err);
        this.chapters = [];
        this.isLoading = false;
      });
  }

  navOutput(nav: KNavInfo) {
    if (!(this.startIndex == nav.from)) {
      this.startIndex = nav.from;
      this.endIndex = nav.to;
      this.getChapters(this.searchText,this.startIndex, this.endIndex);
    }
  }

  ionViewWillLeave() {
    this.utilService.unSubscribeSubscription(this.chaptersSearchSubs);
    this.utilService.unSubscribeSubscription(this.chaptersCntSubs);
  }

}