/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShareholderLedgerRegisterComponent } from './shareholderLedgerRegister.component';

describe('ShareholderLedgerRegisterComponent', () => {
  let component: ShareholderLedgerRegisterComponent;
  let fixture: ComponentFixture<ShareholderLedgerRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareholderLedgerRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholderLedgerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
