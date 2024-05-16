/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportsShareholderComponent } from './reportsShareholder.component';

describe('ReportsShareholderComponent', () => {
  let component: ReportsShareholderComponent;
  let fixture: ComponentFixture<ReportsShareholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsShareholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsShareholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
