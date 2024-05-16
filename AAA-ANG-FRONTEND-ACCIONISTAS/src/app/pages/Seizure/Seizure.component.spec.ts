/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeizureComponent } from './Seizure.component';

describe('SeizureComponent', () => {
  let component: SeizureComponent;
  let fixture: ComponentFixture<SeizureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeizureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeizureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
