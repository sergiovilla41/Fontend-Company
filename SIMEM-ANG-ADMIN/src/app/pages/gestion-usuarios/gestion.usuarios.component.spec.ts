import { TestBed } from "@angular/core/testing"
import { GestionUsuariosComponent } from "./gestion-usuarios.component"
import { provideMockStore } from "@ngrx/store/testing"
import { initialState } from "../../shared/mocks/store.mock"
import { MessageService } from "primeng/api"

describe("ExtraccionesComponent", () => {
  let component: GestionUsuariosComponent
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [
        GestionUsuariosComponent,
        provideMockStore({initialState}),
        MessageService
      ]
    })

    component = TestBed.inject(GestionUsuariosComponent)
  })

  it("", ()=>{
    component.createUser({})
    component.editUser({})
    component.fetchUsers()
    component.ngOnInit()
  })
})
