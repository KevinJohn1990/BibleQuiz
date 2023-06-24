import { Component, OnInit } from '@angular/core';
import { Chapter, TextBook, TextBookViewModel } from '../chapter.model';
import { ChapterService } from '../chapter.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/utils/util.service';
import { AuthService } from 'src/app/auth/auth.service';
import { TextService } from '../text.service';

@Component({
  selector: 'app-chapter-details',
  templateUrl: './chapter-details.page.html',
  styleUrls: ['./chapter-details.page.scss', '../../utils/shared.scss'],
})
export class ChapterDetailsPage {
  chapter: Chapter;
  isLoading: boolean = true;
  isAuth: boolean = true;
  title: string = '';
  constructor(
    private chapterService: ChapterService,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilService,
    private textService: TextService,
    private authService: AuthService
  ) {}

  // subscription
  private activatedRouteSubs: Subscription;
  private chapterSubs: Subscription = null;
  private textSubs: Subscription = null;
  ionViewWillEnter() {
    this.isLoading = true;
    this.isAuth = this.authService.isAuthenticated();
    this.activatedRouteSubs = this.activatedRoute.paramMap.subscribe(
      (params) => {
        let chapterId: string = '';
        if (params.has('id')) {
          chapterId = params.get('id');
          this.isTextLoading = true;
          this.textSubs = this.textService.getTextBooks(chapterId).subscribe({
            next: (val: TextBookViewModel[]) => {
              this.textbook = val;
              this.isTextLoading = false;
            },
            error: (err) => {
              console.error('Error in textbook fetch: ' + err.message);
              this.isTextLoading = false;
            },
          });

          this.chapterSubs = this.chapterService
            .getChapter(chapterId)
            .subscribe({
              next: (data) => {
                this.chapter = data;
                if (data != null) {
                  this.title = this.chapter.id + '. ' + this.chapter.title;
                }
                this.isLoading = false;
              },
              error: (err) => {
                console.log('err:', err);
                this.isLoading = false;
              },
            });
        } else {
          this.isLoading = false;
        }
      }
    );
  }

  ionViewWillLeave() {
    this.utilService.unSubscribeSubscription(this.activatedRouteSubs);
    this.utilService.unSubscribeSubscription(this.chapterSubs);
    this.utilService.unSubscribeSubscription(this.textSubs);
  }

  openNotes(chapterId) {}

  isTextLoading = false;
  textbook: TextBookViewModel[] = [];
  titleHeaderText = 'Add new title and content';
  textTitle = '';
  textContent = '';
  textKey = '';
  openText() {}

  bShowTextEdit = false;
  addTextBookContent() {
    this.cancelTextContent();
    this.bShowTextEdit = true;
    this.titleHeaderText = 'Add new title and content';
  }
  editTextBookContent(text: TextBookViewModel) {
    this.textKey = text.key;
    this.textContent = text.content;
    this.textTitle = text.title;
    this.bShowTextEdit = true;
    this.titleHeaderText = 'Edit the title and content';
  }

  cancelTextContent() {
    this.textKey = '';
    this.textContent = '';
    this.textTitle = '';
    this.bShowTextEdit = false;
  }
  async saveTextContent() {
    try {
      if (!this.textKey) {
        let text: TextBook = {
          title: this.textTitle,
          content: this.textContent,
        };
        const res = await this.textService.addTextBook(this.chapter.key, text);
      } else {
        let text: TextBook = {
          title: this.textTitle,
          content: this.textContent,
        };
        const res = await this.textService.updateTextBook(
          this.chapter.key,
          this.textKey,
          text
        );
      }
      this.utilService.presentToast('Success');
    } catch (error) {
      this.utilService.presentToast('Err in save : ' + error.message);
    }
    this.bShowTextEdit = false;
  }
  editLesson() {
    console.log('To be implemented');
  }
}
