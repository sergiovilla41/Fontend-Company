import { TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ConfirmacionEjecucionModalComponent } from "./confirmacion-ejecucion-modal.component";

describe("ConfirmacionEjecucionModalComponent", () => {
  let component: ConfirmacionEjecucionModalComponent;
  const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close'])

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [ConfirmacionEjecucionModalComponent],
      providers: [
        {provide: MatDialogRef, useValue: matDialogRefSpy},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })

    component = TestBed.createComponent(ConfirmacionEjecucionModalComponent).componentInstance
  }) 

  it("should initialize", () => {
    component.close()
    expect(matDialogRefSpy.close).toHaveBeenCalledTimes(1)
  });
});
