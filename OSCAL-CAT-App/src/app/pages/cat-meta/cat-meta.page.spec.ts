import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatMetaPage } from './cat-meta.page';

describe('CatMetaPage', () => {
  let component: CatMetaPage;
  let fixture: ComponentFixture<CatMetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatMetaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatMetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
