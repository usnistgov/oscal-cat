import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavedWorkPage } from './saved-work.page';

describe('SavedWorkPage', () => {
  let component: SavedWorkPage;
  let fixture: ComponentFixture<SavedWorkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedWorkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavedWorkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
