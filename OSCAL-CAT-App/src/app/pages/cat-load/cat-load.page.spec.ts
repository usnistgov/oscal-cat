import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatLoadPage } from './cat-load.page';

describe('CatLoadPage', () => {
  let component: CatLoadPage;
  let fixture: ComponentFixture<CatLoadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatLoadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatLoadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
