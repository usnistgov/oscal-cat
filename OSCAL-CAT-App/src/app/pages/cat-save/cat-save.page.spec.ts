import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatSavePage } from './cat-save.page';

describe('CatSavePage', () => {
  let component: CatSavePage;
  let fixture: ComponentFixture<CatSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatSavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
