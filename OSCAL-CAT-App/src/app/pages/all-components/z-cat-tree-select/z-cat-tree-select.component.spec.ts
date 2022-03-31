import { IonicModule } from '@ionic/angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZCatTreeComponent } from './z-cat-tree-select.component';

describe('ZCatTreeComponent', () => {
  let component: ZCatTreeComponent;
  let fixture: ComponentFixture<ZCatTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZCatTreeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZCatTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
