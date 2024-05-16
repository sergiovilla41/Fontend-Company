/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TitleShareholderComponent } from './titleShareholder.component';

describe('TitleShareholderComponent', () => {
  let component: TitleShareholderComponent;
  let fixture: ComponentFixture<TitleShareholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleShareholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleShareholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
