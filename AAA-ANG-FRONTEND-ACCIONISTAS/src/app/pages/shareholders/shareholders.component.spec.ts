import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ShareholdersComponent } from "./shareholders.component"
import { MockStore, provideMockStore } from "@ngrx/store/testing"
import { State } from "src/app/model/state.model"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { DropdownModule } from "primeng/dropdown"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { DividerModule } from "primeng/divider"
import { InputTextareaModule } from "primeng/inputtextarea"
import { CalendarModule } from "primeng/calendar"
import { InputNumberModule } from "primeng/inputnumber"
import { CommonModule } from "@angular/common"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { storeInitialStateMock } from "src/app/mocks/initialState.mock"
import { ConfirmationService } from "primeng/api"
import { ShareholderharedDataService } from "src/app/services/shareholders/shareholderSharedData.service"
import { ShareholdersService } from "src/app/services/shareholders/shareholders.service"
import { ReplaySubject, of } from "rxjs"
import { Inject } from "@angular/core"
import { TipoOrder } from "src/app/interfaces/shareholders.interface"
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UpdateStateShareholder } from "src/app/store/actions/shareholder.action"

describe('ShareholdersComponent', () => {
  let fixture: ComponentFixture<ShareholdersComponent>
  let component: ShareholdersComponent
  let store: MockStore<State>
  let confirmationService

  beforeEach(async () => {
    const shareholdersService = jasmine.createSpyObj('ShareholderhareDataService', ['getShareholdersList', 'fetchShareholdersList', 'setPaginador'], {refresh$: new ReplaySubject(1)})

    shareholdersService.fetchShareholdersList.and.returnValue(of('hola'))
    shareholdersService.getShareholdersList.and.returnValue(of({
      rows: 20,
      count: 20
    }))

    await TestBed.configureTestingModule({
      declarations: [ShareholdersComponent],
      imports: [MatSnackBarModule,
        ReactiveFormsModule,
        FormsModule,
        DropdownModule,
        ConfirmDialogModule,
        DividerModule,
        InputTextareaModule,
        CalendarModule,
        InputNumberModule,
        CommonModule,
        BrowserAnimationsModule],
      providers: [provideMockStore({
        initialState: storeInitialStateMock
      }),
        ConfirmationService,
        ShareholderharedDataService,
      { provide: ShareholdersService, useValue: shareholdersService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareholdersComponent);
    component = fixture.componentInstance
    store = Inject(MockStore)
    component.ngOnInit()
    confirmationService = TestBed.inject(ConfirmationService)
  })

  it('should set table values correctly when loading customers', () => {
    const event = {
      first: 0,
      rows: 10,
      sortField: 'column_name',
      sortOrder: 1,
      filters: {
        'column_name': {
          value: 'filter_value'
        }
      }
    };

    component.loadCustomers(event);

    expect(component.loadingsTable).toBeTruthy();
    expect(component.tablaCargar.first).toBe(event.first);
    expect(component.tablaCargar.rows).toBe(event.rows);
    expect(component.tablaCargar.orderCampo).toBe(event.sortField);
    expect(component.tablaCargar.tipoOrder).toBe(TipoOrder.ASC);
    expect(component.tablaCargar.filtro[0].columna).toBe('column_name');
    expect(component.tablaCargar.filtro[0].valor).toBe('filter_value');
  });

  it('calls updateShareholder function when shareholderSeleccionado exists', () => {
    spyOn(component, 'updateShareholder');
    component.shareholderSeleccionado = {BANCO: 'dummy shareholder'};

    component.handleEditShareholder();

    expect(component.updateShareholder).toHaveBeenCalledWith({BANCO: 'dummy shareholder'});
  });

  it('displays a confirmation message when shareholderSeleccionado does not exist', () => {
    spyOn(confirmationService, 'confirm');
    component.shareholderSeleccionado = null;

    component.handleEditShareholder();

    expect(confirmationService.confirm).toHaveBeenCalledWith({
      key: 'accionista',
      header: 'Advertencia',
      message: "Debes seleccionar primero un accionista",
      icon: 'pi pi-info-circle',
      acceptLabel: 'Aceptar',
      rejectVisible: false
    });
  });
})
