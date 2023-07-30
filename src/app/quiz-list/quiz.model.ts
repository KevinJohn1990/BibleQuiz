export enum eAnswerOption {
  optionA,
  optionB,
  optionC,
  optionD,
}

export class Quiz {
  id: number = 0;
  seqId: number = 0;
  question: string = '';
  correctOption: number = 0;
  optionA: string = '';
  optionB: string = '';
  optionC: string = '';
  optionD: string = '';
  description: string = '';
  // chapterKey: string; // chapter key
}
export class QuizViewModel {
  id: number = 0;
  key: string = '';
  seqId: number = 0;
  question: string = '';
  correctOption: eAnswerOption = eAnswerOption.optionA;
  selectedOption: eAnswerOption = eAnswerOption.optionA;
  optionA: string = '';
  optionB: string = '';
  optionC: string = '';
  optionD: string = '';
  description: string = '';
  chapterKey: string = ''; // chapter key
}
