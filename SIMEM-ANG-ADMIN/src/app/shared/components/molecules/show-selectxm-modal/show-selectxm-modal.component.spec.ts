import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSelectxmModalComponent } from './show-selectxm-modal.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

describe('ShowSelectxmModalComponent', () => {
  let component: ShowSelectxmModalComponent;
  let fixture: ComponentFixture<ShowSelectxmModalComponent>;
  const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        ShowSelectxmModalComponent,
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { selectXM: 'pruebas' } },
      ],
    });

    fixture = TestBed.createComponent(ShowSelectxmModalComponent);
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

  it('#onAcceptSelect() should be called', () => {
    component.onAcceptSelect();
    component.close()
  });
});
