import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NavCatComponent } from './nav-cat.component';

describe('NavCatComponent', () => {
  let component: NavCatComponent;
  let fixture: ComponentFixture<NavCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavCatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NavCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
