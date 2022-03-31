import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatBackPage } from './cat-back.page';

describe('CatBackPage', () => {
  let component: CatBackPage;
  let fixture: ComponentFixture<CatBackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatBackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatBackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
