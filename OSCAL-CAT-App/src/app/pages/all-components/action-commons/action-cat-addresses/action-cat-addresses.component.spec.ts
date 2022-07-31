import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OscalCatAddressesComponent } from './action-cat-addresses.component';

describe('ActionArrayAddressOpsComponent', () => {
  let component: OscalCatAddressesComponent;
  let fixture: ComponentFixture<OscalCatAddressesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OscalCatAddressesComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OscalCatAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
