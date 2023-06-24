import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KheaderBackComponent } from './kheader-back.component';

describe('KheaderBackComponent', () => {
  let component: KheaderBackComponent;
  let fixture: ComponentFixture<KheaderBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KheaderBackComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KheaderBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
