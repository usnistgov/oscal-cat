import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationsArrayComponent } from './action-array-locations.component';

describe('ActionArrayLocationsComponent', () => {
  let component: LocationsArrayComponent;
  let fixture: ComponentFixture<LocationsArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsArrayComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationsArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
