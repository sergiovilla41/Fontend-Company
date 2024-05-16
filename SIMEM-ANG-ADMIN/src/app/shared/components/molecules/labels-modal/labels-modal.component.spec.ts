import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsModalComponent } from './labels-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('LabelsModalComponent', () => {
  let component: LabelsModalComponent;
  let fixture: ComponentFixture<LabelsModalComponent>;
  const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        LabelsModalComponent,
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { labels: [], labelsSelected: [] },
        },
      ],
    });

    fixture = TestBed.createComponent(LabelsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should be called', () => {
    component.ngOnInit();
  });

  it('#onNoClick() should be called', () => {
    component.onNoClick();
  });

  it('#onselecLabels() should be called', () => {
    component.onselecLabels();
    component.close()
  });
});
