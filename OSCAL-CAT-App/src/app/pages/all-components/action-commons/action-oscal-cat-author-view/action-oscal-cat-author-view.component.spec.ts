/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OscalCatAuthorViewComponent } from './action-oscal-cat-author-view.component';

describe('ActionOscalCatAuthorViewComponent', () => {
  let component: OscalCatAuthorViewComponent;
  let fixture: ComponentFixture<OscalCatAuthorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OscalCatAuthorViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OscalCatAuthorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
