import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaveChapterPage } from './save-chapter.page';

describe('SaveChapterPage', () => {
  let component: SaveChapterPage;
  let fixture: ComponentFixture<SaveChapterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveChapterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaveChapterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
