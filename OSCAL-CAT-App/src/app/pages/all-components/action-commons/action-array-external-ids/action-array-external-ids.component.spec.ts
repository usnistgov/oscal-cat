import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArrayExternalIDsComponent } from './action-array-external-ids.component';

describe('ActionArrayExternalIDsComponent', () => {
  let component: ArrayExternalIDsComponent;
  let fixture: ComponentFixture<ArrayExternalIDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArrayExternalIDsComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArrayExternalIDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
