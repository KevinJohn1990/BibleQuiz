import { Injectable, Query } from '@angular/core';
import { Chapter } from './chapter.model';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { UtilService } from '../utils/util.service';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  private jsonFileName: string =
    this.utilService.getAPIBaseEndpoint() + 'chapters';
  constructor(
    private db: AngularFireDatabase,
    private utilService: UtilService
  ) {}

  setMainQuizChapterKey(chapterKey: string) {
    localStorage.setItem('mainquizkey', chapterKey);
  }
  getMainQuizChapterKey() {
    return localStorage.getItem('mainquizkey');
  }
  // getChapter(id: string): Observable<Chapter> {
  //   return this.db.object<Chapter>(`${this.jsonFileName}/${id}`)
  //     .valueChanges();
  // }

  // getChapters(): Observable<Chapter[]> {
  //   return this.db.list<Chapter>(this.jsonFileName)
  //     .valueChanges();
  // }

  getChapter(id: string): Observable<Chapter> {
    return this.db
      .object<Chapter>(`${this.jsonFileName}/${id}`)
      .snapshotChanges()
      .pipe(
        map((val) => {
          const data = val.payload.val();
          const chapter: Chapter = {
            id: data.id,
            summary: data.summary,
            title: data.title,
            memoryVerse: data.memoryVerse,
            memoryVerseRef: data.memoryVerseRef,
            readingPortion: data.readingPortion,
            key: val.key,
          };
          return chapter;
        })
      );
  }

  getTotalChapterCount(): Observable<number> {
    let chpList: AngularFireList<Chapter>;
    chpList = this.db.list<Chapter>(`${this.jsonFileName}`, (ref) =>
      ref.orderByChild('id').limitToLast(1)
    );
    return chpList.valueChanges().pipe(
      first(),
      map((chapters) => {
        if (chapters && chapters.length > 0) {
          return chapters[0].id;
        }
        return 0;
      })
    );
  }

  getChaptersWithSearch(
    startIndex: number = 0,
    endIndex: number = 5,
    searchText: string = ''
  ): Observable<Chapter[]> {
    let chpList: AngularFireList<Chapter>;
    if (
      this.utilService.isNullOrEmpty(searchText) ||
      !this.utilService.isNumeric(searchText)
    ) {
      chpList = this.db.list<Chapter>(this.jsonFileName, (ref) =>
        ref.orderByChild('id').startAt(startIndex, 'id').endAt(endIndex, 'id')
      );
    } else {
      chpList = this.db.list<Chapter>(this.jsonFileName, (ref) =>
        ref.orderByChild('id').equalTo(parseInt(searchText))
      );
    }
    return chpList.snapshotChanges().pipe(
      map((vals) => {
        return vals.map((val) => {
          const data = val.payload.val();
          const chapter: Chapter = {
            id: data.id,
            summary: data.summary,
            title: data.title,
            memoryVerse: data.memoryVerse,
            memoryVerseRef: data.memoryVerseRef,
            readingPortion: data.readingPortion,
            key: val.key,
          };
          return chapter;
        });
      })
    );
  }

  getChapters(): Observable<Chapter[]> {
    // return this.db.list<Chapter>(this.jsonFileName, ref => ref.orderByChild('id').startAt(0, "id").endAt(5, "id"))
    return this.db
      .list<Chapter>(this.jsonFileName, (ref) =>
        ref.orderByChild('id').startAt(0, 'id').endAt(5, 'id')
      )
      .snapshotChanges()
      .pipe(
        map((vals: any) => {
          return vals.map((val) => {
            const data = val.payload.val();
            const chapter: Chapter = {
              id: data.id,
              summary: data.summary,
              title: data.title,
              memoryVerse: data.memoryVerse,
              memoryVerseRef: data.memoryVerseRef,
              readingPortion: data.readingPortion,
              key: val.key,
            };
            return chapter;
          });
        })
      );
  }

  addChapter(chapter: Chapter) {
    return this.db.list(this.jsonFileName).push(chapter);
  }

  updateChapter(chapter: Chapter) {
    return this.db.list(this.jsonFileName).update(chapter.key, chapter);
  }

  deleteChapter(chapter: Chapter) {
    return this.db.list(this.jsonFileName).remove(chapter.key);
  }
}
