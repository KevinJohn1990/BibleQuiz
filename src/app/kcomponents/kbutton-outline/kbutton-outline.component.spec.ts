import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KbuttonOutlineComponent } from './kbutton-outline.component';

describe('KbuttonOutlineComponent', () => {
  let component: KbuttonOutlineComponent;
  let fixture: ComponentFixture<KbuttonOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbuttonOutlineComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KbuttonOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
