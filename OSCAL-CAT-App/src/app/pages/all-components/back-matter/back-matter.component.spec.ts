import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BackMatterComponent } from './back-matter.component';

describe('BackMatterComponent', () => {
  let component: BackMatterComponent;
  let fixture: ComponentFixture<BackMatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackMatterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BackMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
