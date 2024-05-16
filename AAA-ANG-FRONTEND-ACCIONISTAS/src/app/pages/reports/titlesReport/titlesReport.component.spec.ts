/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TitlesReportComponent } from './titlesReport.component';

describe('TitlesReportComponent', () => {
  let component: TitlesReportComponent;
  let fixture: ComponentFixture<TitlesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitlesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
