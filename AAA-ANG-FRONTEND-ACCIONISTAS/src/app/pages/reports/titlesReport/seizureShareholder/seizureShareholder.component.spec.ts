/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeizureShareholderComponent } from './seizureShareholder.component';

describe('SeizureShareholderComponent', () => {
  let component: SeizureShareholderComponent;
  let fixture: ComponentFixture<SeizureShareholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeizureShareholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeizureShareholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
