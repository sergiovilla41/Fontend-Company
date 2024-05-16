/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ComptrollerReportingComponent } from './comptrollerReporting.component';

describe('ComptrollerReportingComponent', () => {
  let component: ComptrollerReportingComponent;
  let fixture: ComponentFixture<ComptrollerReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptrollerReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptrollerReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
