import { TestBed } from "@angular/core/testing"
import { provideMockStore } from '@ngrx/store/testing';
import { MonitoreoDeEjecucionesYErroresComponent } from "./monitoreo-de-ejecuciones-y-errores.component";
import { initialState } from "../../../shared/mocks/store.mock";

describe("MonitoreoDeEjecucionesYErroresComponent", () => {
  let component: MonitoreoDeEjecucionesYErroresComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MonitoreoDeEjecucionesYErroresComponent,
        provideMockStore({ initialState }),
      ]
    })
    component = TestBed.inject(MonitoreoDeEjecucionesYErroresComponent)
  })

  it('#ngOnInit() should call the store', () => {
    component.ngOnInit()
  })
})