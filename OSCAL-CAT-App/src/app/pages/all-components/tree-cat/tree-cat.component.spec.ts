import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeCatComponent } from './tree-cat.component';

describe('TreeViewComponent', () => {
  let component: TreeCatComponent;
  let fixture: ComponentFixture<TreeCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TreeCatComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TreeCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
