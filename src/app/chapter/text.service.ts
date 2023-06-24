import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { UtilService } from '../utils/util.service';
import { TextBookViewModel, TextBook } from './chapter.model';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private jsonFileName: string =
    this.utilService.getAPIBaseEndpoint() + 'textBook';
  constructor(
    private db: AngularFireDatabase,
    private utilService: UtilService
  ) {}

  getText(chapterKey: string, textKey: string): Observable<TextBookViewModel> {
    return this.db
      .object<TextBook>(`${this.jsonFileName}/${chapterKey}/${textKey}`)
      .valueChanges()
      .pipe(
        map((textBook) => {
          var data = textBook;
          var objText: TextBookViewModel = {
            title: data.title,
            content: data.content,
            chapterKey: chapterKey,
            key: textKey,
          };
          return objText;
        })
      );
  }

  getTotalTextCount(chapterKey: string): Observable<number> {
    let textBookList: AngularFireList<TextBook>;
    textBookList = this.db.list<TextBook>(
      `${this.jsonFileName}/${chapterKey}`,
      (ref) => ref.orderByChild('id').limitToLast(1)
    );
    return textBookList.valueChanges().pipe(
      first(),
      map((textBooks: any) => {
        if (textBooks && textBooks.length > 0) {
          if (this.utilService.isNumeric(textBooks[0].id)) {
            return textBooks[0].id;
          }
        }
        return 0;
      })
    );
  }

  getTextBooksWithSearch(
    chapterKey: string,
    startIndex: number = 0,
    endIndex: number = 5,
    searchText: string = ''
  ): Observable<TextBookViewModel[]> {
    let textBookList: AngularFireList<TextBook>;
    if (
      this.utilService.isNullOrEmpty(searchText) ||
      !this.utilService.isNumeric(searchText)
    ) {
      textBookList = this.db.list<TextBook>(
        `${this.jsonFileName}/${chapterKey}`,
        (ref) => ref.orderByChild('id').startAt(startIndex).endAt(endIndex)
      );
    } else {
      textBookList = this.db.list<TextBook>(
        `${this.jsonFileName}/${chapterKey}`,
        (ref) => ref.orderByChild('id').equalTo(parseInt(searchText))
      );
    }
    return textBookList.snapshotChanges().pipe(
      map((textBooks) => {
        return textBooks.map((textBook) => {
          var data = textBook.payload.val();
          var textBookModel: TextBookViewModel = {
            title: data.title,
            content: data.content,
            chapterKey: chapterKey,
            key: textBook.key,
          };
          return textBookModel;
        }) as TextBookViewModel[];
      })
    );
  }

  getTextBooks(chapterKey: string): Observable<TextBookViewModel[]> {
    return this.db
      .list<TextBook>(`${this.jsonFileName}/${chapterKey}`, (ref) =>
        ref.orderByChild('id')
      )
      .snapshotChanges()
      .pipe(
        map((textBooks: any) => {
          return textBooks.map((textBook) => {
            var data = textBook.payload.val();
            var textBookModel: TextBookViewModel = {
              title: data.title,
              content: data.content,
              chapterKey: chapterKey,
              key: textBook.key,
            };
            return textBookModel;
          }) as TextBookViewModel[];
        })
      );
  }

  addTextBook(chapterKey: string, textBook: TextBook) {
    return this.db.list(`${this.jsonFileName}/${chapterKey}`).push(textBook);
  }

  updateTextBook(chapterKey: string, textBookKey: string, textBook: TextBook) {
    return this.db
      .object(`${this.jsonFileName}/${chapterKey}/${textBookKey}`)
      .update(textBook);
  }

  deleteTextBook(chapterKey: string, textBookKey: string) {
    return this.db
      .object(`${this.jsonFileName}/${chapterKey}/${textBookKey}`)
      .remove();
  }
}
