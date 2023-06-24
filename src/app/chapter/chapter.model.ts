export class Chapter {
  id: number;
  title: string;
  summary: string;
  memoryVerseRef: string;
  memoryVerse: string;
  readingPortion: string;
  key: string;
}
export class TextBook {
  title: string;
  content: string;
  // chapterKey: string; // chapter key
}
export class TextBookViewModel {
  title: string;
  content: string;
  chapterKey: string; //chapter key
  key: string; // textbook key
}
