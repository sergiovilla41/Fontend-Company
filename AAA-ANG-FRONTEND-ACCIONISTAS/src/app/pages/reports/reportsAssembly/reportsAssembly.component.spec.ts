/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportsAssemblyComponent } from './reportsAssembly.component';

describe('ReportsAssemblyComponent', () => {
  let component: ReportsAssemblyComponent;
  let fixture: ComponentFixture<ReportsAssemblyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsAssemblyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
