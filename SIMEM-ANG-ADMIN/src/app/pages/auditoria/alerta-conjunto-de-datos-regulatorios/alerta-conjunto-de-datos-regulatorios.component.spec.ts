import { TestBed } from "@angular/core/testing"
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from "../../../shared/mocks/store.mock";
import { AlertaConjuntoDeDatosRegulatoriosComponent } from "./alerta-conjunto-de-datos-regulatorios.component";

describe("AlertaConjuntoDeDatosRegulatoriosComponent", () => {
  let component: AlertaConjuntoDeDatosRegulatoriosComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertaConjuntoDeDatosRegulatoriosComponent,
        provideMockStore({ initialState }),
      ]
    })
    component = TestBed.inject(AlertaConjuntoDeDatosRegulatoriosComponent)
  })

  it('#ngOnInit() should call the store', () => {
    component.ngOnInit()
  })
})
