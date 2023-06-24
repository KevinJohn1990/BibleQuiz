import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaveQuizPage } from './save-quiz.page';

describe('SaveQuizPage', () => {
  let component: SaveQuizPage;
  let fixture: ComponentFixture<SaveQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaveQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
