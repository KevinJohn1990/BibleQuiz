import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChapterPage } from './chapter.page';

describe('ChapterPage', () => {
  let component: ChapterPage;
  let fixture: ComponentFixture<ChapterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
