import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArrayLinksComponent } from './action-array-links.component';

describe('ArrayLinksComponent', () => {
  let component: ArrayLinksComponent;
  let fixture: ComponentFixture<ArrayLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArrayLinksComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArrayLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
