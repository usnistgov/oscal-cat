/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CatControlComponent } from './action-cat-control.component';

describe('ActionCatControlComponent', () => {
  let component: CatControlComponent;
  let fixture: ComponentFixture<CatControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatControlComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
