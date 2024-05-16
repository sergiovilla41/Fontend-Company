/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportBallotComponent } from './reportBallot.component';

describe('ReportBallotComponent', () => {
  let component: ReportBallotComponent;
  let fixture: ComponentFixture<ReportBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
