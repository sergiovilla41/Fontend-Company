import { TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DetalleMonitoreoDeEjecucionModalComponent } from "./detalle-monitoreo-de-ejecucion-modal.component";

describe("DetalleMonitoreoDeEjecucionModalComponent", () => {
  let component: DetalleMonitoreoDeEjecucionModalComponent;
  const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close'])

  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [
        DetalleMonitoreoDeEjecucionModalComponent,
        {provide: MatDialogRef, useValue: matDialogRefSpy},
        {provide: MAT_DIALOG_DATA, useValue: {detail: ""}}
      ]
    })

    component = TestBed.inject(DetalleMonitoreoDeEjecucionModalComponent)
  })

  it("should initialize", () => {
    component.close()
    expect(matDialogRefSpy.close).toHaveBeenCalledTimes(1)
    component.ngOnInit()
  });
});
