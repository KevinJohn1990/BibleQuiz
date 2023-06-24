import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KsearchComponent } from './ksearch.component';

describe('KsearchComponent', () => {
  let component: KsearchComponent;
  let fixture: ComponentFixture<KsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KsearchComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
