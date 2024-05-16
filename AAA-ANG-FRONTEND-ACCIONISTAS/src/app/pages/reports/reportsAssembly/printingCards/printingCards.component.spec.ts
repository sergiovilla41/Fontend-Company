/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrintingCardsComponent } from './printingCards.component';

describe('PrintingCardsComponent', () => {
  let component: PrintingCardsComponent;
  let fixture: ComponentFixture<PrintingCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintingCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
