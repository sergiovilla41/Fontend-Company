import { TestBed } from "@angular/core/testing"
import { EtiquetasComponent } from "./etiquetas.component"
import { provideMockStore } from "@ngrx/store/testing"
import { initialState } from "../../shared/mocks/store.mock"
import { MessageService } from "primeng/api"

describe('EtiquetasComponent',()=>{
  let component: EtiquetasComponent
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [
        EtiquetasComponent,
        provideMockStore({initialState: initialState}),
        MessageService
      ]
    })

    component = TestBed.inject(EtiquetasComponent)
  })

  it("etiquetas",()=>{
    component.ngOnInit()
    component.fetchLabels()
    component.updateLabel({estado: true, generacionArchivos: [], titulo: ''})
    component.createLabel({estado: true, generacionArchivos: [], titulo: ''}  )
  })
})
