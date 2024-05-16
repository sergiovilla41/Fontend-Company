/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShareholdersBookComponent } from './shareholdersBook.component';

describe('ShareholdersBookComponent', () => {
  let component: ShareholdersBookComponent;
  let fixture: ComponentFixture<ShareholdersBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareholdersBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholdersBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
