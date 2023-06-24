import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KprogressComponent } from './kprogress.component';

describe('KprogressComponent', () => {
  let component: KprogressComponent;
  let fixture: ComponentFixture<KprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KprogressComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
