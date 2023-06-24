import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KNavComponent } from './knav.component';

describe('KNavComponent', () => {
  let component: KNavComponent;
  let fixture: ComponentFixture<KNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KNavComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
