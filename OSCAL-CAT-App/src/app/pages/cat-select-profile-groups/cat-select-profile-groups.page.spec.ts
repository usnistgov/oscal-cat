import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatSelectProfileGroupsPage } from './cat-select-profile-groups.page';

describe('CatSelectProfileGroupsPage', () => {
  let component: CatSelectProfileGroupsPage;
  let fixture: ComponentFixture<CatSelectProfileGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatSelectProfileGroupsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatSelectProfileGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
