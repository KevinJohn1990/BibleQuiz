import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/utils/util.service';
import { Chapter } from '../chapter.model';
import { ChapterService } from '../chapter.service';

@Component({
  selector: 'app-save-chapter',
  templateUrl: './save-chapter.page.html',
  styleUrls: ['./save-chapter.page.scss', '../../utils/shared.scss'],
})
export class SaveChapterPage {
  isLoading: boolean = false;
  chapter: Chapter;
  headerTitle: string = '';
  id: string = null;
  ChapterGroup: FormGroup;
  constructor(
    private utilService: UtilService,
    private chapterService: ChapterService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) {
    this.ChapterGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      summary: new FormControl('', [Validators.required]),
      memoryVerseRef: new FormControl('', []),
      memoryVerse: new FormControl('', []),
      readingPortion: new FormControl('', []),
    });
  }

  // Subscription
  private activatedRouteSubs: Subscription = null;
  private chapterSubs: Subscription = null;

  ionViewWillLeave() {
    this.utilService.unSubscribeSubscription(this.activatedRouteSubs);
    this.utilService.unSubscribeSubscription(this.chapterSubs);
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.activatedRouteSubs = this.activatedRoute.paramMap.subscribe(
      (params) => {
        let chapterId: string = '';
        if (params.has('id')) {
          chapterId = params.get('id');
          this.chapterSubs = this.chapterService
            .getChapter(chapterId)
            .subscribe({
              next: (data) => {
                const chapter: Chapter = data;
                this.setChapterGroup(chapter);
                this.headerTitle = 'Edit : ' + chapter.title;
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

  get title() {
    return this.ChapterGroup.get('title');
  }

  get summary() {
    return this.ChapterGroup.get('summary');
  }

  save() {
    const chapter: Chapter = this.getChapterFromScreen();
    if (this.validateChapter(chapter) == false) {
      return;
    }
    this.chapterService
      .updateChapter(chapter)
      .then((res) => {
        this.utilService.presentToast('Update successful');
        // this.navCtrl.pop();
      })
      .catch((err) => this.utilService.presentToast('Update failed, ' + err));
  }

  private validateChapter(chapter: Chapter): boolean {
    if (this.utilService.isNullOrEmpty(chapter.id)) {
      this.utilService.presentToast('Id should be numeric');
      return false;
    }
    if (this.utilService.isNumeric(chapter.id) == false) {
      this.utilService.presentToast('Id should be numeric');
      return false;
    }
    if (this.utilService.isNullOrEmpty(chapter.summary)) {
      this.utilService.presentToast('Kindly enter summary');
      return false;
    }
    if (this.utilService.isNullOrEmpty(chapter.title)) {
      this.utilService.presentToast('Kindly enter title');
      return false;
    }
    return true;
  }

  private getChapterFromScreen(): Chapter {
    let chapter: Chapter = this.chapter;
    chapter.id = parseInt(this.ChapterGroup.get('id').value);
    chapter.summary = this.ChapterGroup.get('summary').value;
    chapter.title = this.ChapterGroup.get('title').value;
    chapter.memoryVerse = this.ChapterGroup.get('memoryVerse').value;
    chapter.memoryVerseRef = this.ChapterGroup.get('memoryVerseRef').value;
    chapter.readingPortion = this.ChapterGroup.get('readingPortion').value;

    return chapter;
  }

  private setChapterGroup(chapter: Chapter) {
    this.chapter = chapter;
    this.ChapterGroup.setValue({
      id: chapter.id,
      title: chapter.title,
      summary: chapter.summary,
      memoryVerseRef: chapter.memoryVerseRef,
      memoryVerse: chapter.memoryVerse,
      readingPortion: chapter.readingPortion,
    });
  }
}
