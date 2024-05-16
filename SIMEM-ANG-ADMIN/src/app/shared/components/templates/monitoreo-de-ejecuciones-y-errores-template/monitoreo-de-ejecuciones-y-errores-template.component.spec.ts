import { TestBed } from "@angular/core/testing";
import { MonitoreoDeEjecucionesYErroresTemplateComponent } from "./monitoreo-de-ejecuciones-y-errores-template.component"


describe("MonitoreoDeEjecucionesYErroresTemplateComponent", () => {
  let component: MonitoreoDeEjecucionesYErroresTemplateComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitoreoDeEjecucionesYErroresTemplateComponent]
    })
    component = TestBed.inject(MonitoreoDeEjecucionesYErroresTemplateComponent)
  })

  it("#ngOnChanges() should update class properties", () => {
    component.executionMonitoring = []
    component.ngOnChanges({ "executionMonitoring": { currentValue: [], firstChange: false, previousValue: [], isFirstChange: () => false } })
    component.showConfirmation()
    component.showDetailExecutionMonitoring("")
  })
})
