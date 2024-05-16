import { TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { Observable } from "rxjs";
import { InteractionStatus } from "@azure/msal-browser";
import { Router } from "@angular/router";
import { provideMockStore } from "@ngrx/store/testing";
import { initialState } from "../../shared/mocks/store.mock";

describe("LoginComponent", () => {
  let component: LoginComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginComponent,
        {
          provide: MsalService, useValue: {
            instance: {
              getActiveAccount() {
                return null
              },
              getAllAccounts() {
                return [{

                }]
              },
              setActiveAccount() { return }
            },
            handleRedirectObservable() { return new Observable() },
            loginRedirect() { return },
            logout(){return}
          }
        },
        {
          provide: MsalBroadcastService,
          useValue: {
            inProgress$: new Observable(a => a.next(InteractionStatus.None))
          }
        }, {
          provide: Router,
          useValue: {
            navigate() { return }
          }
        },
        provideMockStore({ initialState: initialState })
      ]
    })

    component = TestBed.inject(LoginComponent)
  })

  it("Initialization", () => {
    expect(component).toBeTruthy()
    component.ngOnInit()
    component.login()
    component.hide()
  })
})
