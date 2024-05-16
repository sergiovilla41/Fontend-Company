import { TestBed } from "@angular/core/testing"
import { BackButtonComponent } from "./back-button.component"
import { Location } from "@angular/common"

describe("BackButtonComponent", ()=>{
  let component: BackButtonComponent
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [
        BackButtonComponent,
        {
          provide: Location,
          useValue: {
            back(){return}
          }
        }
      ]
    })

    component = TestBed.inject(BackButtonComponent)
  })

  it("#back() should", ()=>{
    component.goBack()
  })
})
