import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CatSelectCatAsyncPage } from './cat-select-cat-async.page';

describe('CatSelectCatAsyncPage', () => {
  let component: CatSelectCatAsyncPage;
  let fixture: ComponentFixture<CatSelectCatAsyncPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatSelectCatAsyncPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatSelectCatAsyncPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
