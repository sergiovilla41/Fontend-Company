/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TermsConditionsUseComponent } from './termsConditionsUse.component';

describe('TermsConditionsUseComponent', () => {
  let component: TermsConditionsUseComponent;
  let fixture: ComponentFixture<TermsConditionsUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsConditionsUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditionsUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
