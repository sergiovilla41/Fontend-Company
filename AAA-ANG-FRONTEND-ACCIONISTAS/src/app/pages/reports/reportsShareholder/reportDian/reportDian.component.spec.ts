/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportDianComponent } from './reportDian.component';

describe('ReportDianComponent', () => {
  let component: ReportDianComponent;
  let fixture: ComponentFixture<ReportDianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
