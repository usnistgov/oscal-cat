import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CatSelectCatalogPage } from './cat-select-catalog.page';

describe('CatSelectPage', () => {
  let component: CatSelectCatalogPage;
  let fixture: ComponentFixture<CatSelectCatalogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatSelectCatalogPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatSelectCatalogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
