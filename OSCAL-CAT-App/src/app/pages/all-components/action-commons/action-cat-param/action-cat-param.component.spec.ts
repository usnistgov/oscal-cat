/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CatParamComponent } from './action-cat-param.component';

describe('ActionCatParamComponent', () => {
  let component: CatParamComponent;
  let fixture: ComponentFixture<CatParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatParamComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
