import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatControlPage } from './cat-control.page';

describe('CatControlPage', () => {
  let component: CatControlPage;
  let fixture: ComponentFixture<CatControlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatControlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
