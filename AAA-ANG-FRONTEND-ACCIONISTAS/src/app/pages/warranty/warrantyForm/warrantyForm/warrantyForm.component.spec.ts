/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WarrantyFormComponent } from './warrantyForm.component';

describe('WarrantyFormComponent', () => {
  let component: WarrantyFormComponent;
  let fixture: ComponentFixture<WarrantyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
