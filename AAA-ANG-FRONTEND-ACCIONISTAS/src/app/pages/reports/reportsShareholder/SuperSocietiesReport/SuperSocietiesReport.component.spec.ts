/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SuperSocietiesReportComponent } from './SuperSocietiesReport.component';

describe('SuperSocietiesReportComponent', () => {
  let component: SuperSocietiesReportComponent;
  let fixture: ComponentFixture<SuperSocietiesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperSocietiesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperSocietiesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
