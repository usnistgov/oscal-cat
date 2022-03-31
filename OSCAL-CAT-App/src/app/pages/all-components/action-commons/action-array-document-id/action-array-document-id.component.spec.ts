import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentIDArrayComponent } from './action-array-document-id.component';

describe('ActionArrayDocumentIDComponent', () => {
  let component: DocumentIDArrayComponent;
  let fixture: ComponentFixture<DocumentIDArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentIDArrayComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentIDArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
