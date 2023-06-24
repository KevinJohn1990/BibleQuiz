import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizListPage } from './quiz-list.page';

describe('QuizListPage', () => {
  let component: QuizListPage;
  let fixture: ComponentFixture<QuizListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
