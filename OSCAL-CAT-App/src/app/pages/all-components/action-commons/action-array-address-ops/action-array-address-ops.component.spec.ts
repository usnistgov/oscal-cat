import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActionArrayAddressOpsComponent } from './action-array-address-ops.component';

describe('ActionArrayAddressOpsComponent', () => {
  let component: ActionArrayAddressOpsComponent;
  let fixture: ComponentFixture<ActionArrayAddressOpsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionArrayAddressOpsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionArrayAddressOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
