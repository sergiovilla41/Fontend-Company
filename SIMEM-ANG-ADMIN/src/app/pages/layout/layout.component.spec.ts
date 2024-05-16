import { TestBed } from "@angular/core/testing"
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from "../../shared/mocks/store.mock";
import { LayoutComponent } from "./layout.component";
import { LoadingService } from "../../shared/services/loading-service/loading-service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayoutComponent,
        provideMockStore({ initialState }),
        {
          provide: LoadingService, useValue: {
            getLoading() {
              return new Observable(a => a.next(true))
            }
          }
        },
        { provide: Router, useValue: { events: new Observable(a => a.next(true)) } }
      ]
    })
    component = TestBed.inject(LayoutComponent)
  })

  it('#ngOnInit() should call the store', () => {
    component.ngOnInit()
  })
})
