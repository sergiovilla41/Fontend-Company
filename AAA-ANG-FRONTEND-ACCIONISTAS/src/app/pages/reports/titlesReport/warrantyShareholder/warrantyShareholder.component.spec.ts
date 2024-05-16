/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WarrantyShareholderComponent } from './warrantyShareholder.component';

describe('WarrantyShareholderComponent', () => {
  let component: WarrantyShareholderComponent;
  let fixture: ComponentFixture<WarrantyShareholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyShareholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyShareholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
