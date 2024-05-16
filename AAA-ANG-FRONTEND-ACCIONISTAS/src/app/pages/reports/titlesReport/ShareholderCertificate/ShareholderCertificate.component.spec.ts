/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShareholderCertificateComponent } from './ShareholderCertificate.component';

describe('ShareholderCertificateComponent', () => {
  let component: ShareholderCertificateComponent;
  let fixture: ComponentFixture<ShareholderCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareholderCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholderCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
