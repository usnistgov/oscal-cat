import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatReviewPage } from './cat-review.page';

describe('CatReviewPage', () => {
  let component: CatReviewPage;
  let fixture: ComponentFixture<CatReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
