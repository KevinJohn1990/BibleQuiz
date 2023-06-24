import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KheaderComponent } from './kheader.component';

describe('KheaderComponent', () => {
  let component: KheaderComponent;
  let fixture: ComponentFixture<KheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KheaderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
