import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatSelectProfilePage } from './cat-select-profile.page';

describe('CatSelectProfilePage', () => {
  let component: CatSelectProfilePage;
  let fixture: ComponentFixture<CatSelectProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatSelectProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatSelectProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
