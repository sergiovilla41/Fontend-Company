import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ShareholdresFormComponent } from "./shareholdresForm.component"
import { MockStore, provideMockStore } from "@ngrx/store/testing"
import { storeInitialStateMock } from "src/app/mocks/initialState.mock"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { ConfirmationService } from "primeng/api"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ShareholderharedDataService } from "src/app/services/shareholders/shareholderSharedData.service"
import { ShareholdersService } from "src/app/services/shareholders/shareholders.service"
import { State } from "src/app/model/state.model"
import { of } from "rxjs"
import { UpdateStateShareholder, newShareholder } from "src/app/store/actions/shareholder.action"
import { department } from "src/app/store/actions/department.action"
import { cities } from "src/app/store/actions/city.action"
import { countryCitiesInterface } from "src/app/model/countryCities.model"
import { DropdownModule } from "primeng/dropdown"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { DividerModule } from "primeng/divider"
import { InputTextareaModule } from "primeng/inputtextarea"
import { CalendarModule } from "primeng/calendar"
import { InputNumberModule } from "primeng/inputnumber"
import { personTypes } from "src/app/store/actions/personType.action"
import { CommonModule } from "@angular/common"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

describe('ShareholdresFormComponent', () => {

  let shareholdresForm: ShareholdresFormComponent;
  let fixture: ComponentFixture<ShareholdresFormComponent>
  let store: MockStore<State>;
  let shareholderHared: ShareholderharedDataService;
  let shareholderService: ShareholdersService;
  let actionsSpy;

  beforeEach(async () => {
    const shareholdersService = jasmine.createSpyObj('ShareholderhareDataService', ['fetchShareholdersList', 'getShareholder'])
    shareholdersService.fetchShareholdersList.and.returnValue(of('hola'))
    shareholdersService.getShareholder.and.returnValue(of({
      ID_REGISTRO: '12345',
      PAIS: 'colombia',
      DEPARTAMENTO: 'antioquia'
    }))

    await TestBed.configureTestingModule({
      declarations: [ShareholdresFormComponent],
      imports: [
        MatSnackBarModule,
        ReactiveFormsModule,
        FormsModule,
        DropdownModule,
        ConfirmDialogModule,
        DividerModule,
        InputTextareaModule,
        CalendarModule,
        InputNumberModule,
        CommonModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({
          initialState: storeInitialStateMock
        }),
        ConfirmationService,
        ShareholderharedDataService,
        { provide: ShareholdersService, useValue: shareholdersService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareholdresFormComponent)
    shareholdresForm = fixture.componentInstance
    store = TestBed.inject(MockStore)
    actionsSpy = spyOn(store, 'dispatch').and.callThrough()
    shareholdresForm.ngOnInit();
    shareholderHared = TestBed.inject(ShareholderharedDataService)
    shareholderService = TestBed.inject(ShareholdersService)
  })

  it('#ngOnInit() should initialize all variables', () => {
    spyOn(shareholdresForm, 'goBack')
    expect(shareholdresForm.idParam).toEqual(undefined);
    expect(shareholdresForm.stateParam).toEqual(undefined);
    expect(shareholdresForm.task).not.toEqual(undefined);
    expect(shareholdresForm.loadings).not.toEqual(false);
    expect(shareholdresForm.maxDate.toDateString()).toEqual(new Date().toDateString())
    expect(shareholdresForm.prepareDataShareholder).toEqual({})
    expect(shareholdresForm.status).toEqual(storeInitialStateMock.shareholderList)
    expect(shareholdresForm.form).not.toEqual(undefined)
    expect(shareholdresForm.selectedBank).toEqual(undefined)
    expect(shareholdresForm.selectedCity).toEqual(undefined)
    expect(shareholdresForm.selectedCountry).toEqual(undefined)
    expect(shareholdresForm.selectedDepartment).toEqual(undefined)
    expect(shareholdresForm.selectedIdentificationtype).toEqual(undefined)
    expect(shareholdresForm.fecha_expedicion).toBe(undefined)

    shareholdresForm.permissionsBank$.subscribe(data => expect(data).toEqual(storeInitialStateMock.bankList))
    shareholdresForm.permissionsCity$.subscribe(data => expect(data).toEqual(storeInitialStateMock.city))
    shareholdresForm.permissionsCountry$.subscribe(data => expect(data).toEqual(storeInitialStateMock.country))
    shareholdresForm.permissionsStateTrue$.subscribe(data => expect(data).toEqual(storeInitialStateMock.state))
    shareholdresForm.permissionsDepartment$.subscribe(data => expect(data).toEqual(storeInitialStateMock.department))
    shareholdresForm.permissionsPersonType$.subscribe(data => expect(data).toEqual(storeInitialStateMock.personTypeList))
    shareholdresForm.permissionsTypeOfFiler$.subscribe(data => expect(data).toEqual(storeInitialStateMock.typeOfFilerList))
    shareholdresForm.permissionsaccountType$.subscribe(data => expect(data).toEqual(storeInitialStateMock.accountTypeList))
    shareholdresForm.permissionsNacionalityType$.subscribe(data => expect(data).toEqual(storeInitialStateMock.nacionalityTypeList))
    shareholdresForm.permissionsShareholderType$.subscribe(data => expect(data).toEqual(storeInitialStateMock.shareholderTypeList))
    shareholdresForm.permissionsIdentificationtype$.subscribe(data => expect(data).toEqual(storeInitialStateMock.identificationTypeList))
    expect(shareholdresForm.tipo_persona).toEqual(storeInitialStateMock.personTypeList.personTypesList)
    store.setState({...storeInitialStateMock, shareholderList: {...storeInitialStateMock.shareholderList, status: 200}})
    expect(shareholdresForm.status.status).toEqual(200)
  })

  it('#getShareholder() should subscribe to the object thrown for the service', () => {
    expect(shareholdresForm.idShareholder).toEqual(null)
    shareholdresForm.getShareholder('123')
    expect(shareholdresForm.idShareholder).toEqual('12345')
    expect(actionsSpy).toHaveBeenCalledWith(department({ country: {isoCode: 'colombia'} }))
  })

  it('#addShareholder() should mark as touched the form when the inputs are incorrect', () => {
    expect(shareholdresForm.form.touched).toEqual(false);
    shareholdresForm.addShareholder();
    expect(shareholdresForm.form.touched).toEqual(true);
  })

  it('#addShareholder() should call #submitFormulario() when the inputs are correct', () => {
    spyOn(shareholdresForm, 'submitFormulario');

    shareholdresForm.form.setValue({
      primer_nombre: 'gfs',
      segundo_nombre: 'gres',
      primer_apellido: 'greds',
      segundo_apellido: 'gredf',
      selectedIdentificationtype: 'ger',
      identificacion: 'grsedf',
      selectedPersonType: 'gre',
      selectedShareholderType: 'gersf',
      telefono_1: 'rfgsr',
      selectedCountry: 'gers',
      selectedDepartment: 'gerfd',
      selectedCity: 'grfdesg',
      selectedNacionalityType: 'grefsz',
      selectedState: 'gresdf',
      fecha_expedicion: 'gresdz',
      lugar_expedicion: 'gfsrefd',
      empresa: 'grefgs',
      representante: 'gsgrefgs',
      direccion: 'gsergs',
      telefono_2: 'gserfgs',
      email_1: 'gsergs',
      email_2: 'gsergfs',
      nro_cuenta: 'gsrgsr'
    })

    shareholdresForm.addShareholder();

    expect(shareholdresForm.form.valid).toEqual(true)
    expect(shareholdresForm.form.touched).toEqual(false)
  })

  it('#submitFormulario() should dispath either UpdateShareholder or newShareholder depending on the task', () => {
    expect(shareholdresForm.task).toEqual('Creación');
    shareholdresForm.form.setValue({
      primer_nombre: 'gfs',
      segundo_nombre: 'gres',
      primer_apellido: 'greds',
      segundo_apellido: 'gredf',
      selectedIdentificationtype: 'ger',
      identificacion: 'grsedf',
      selectedPersonType: 'gre',
      selectedShareholderType: 'gersf',
      telefono_1: 'rfgsr',
      selectedCountry: 'gers',
      selectedDepartment: 'gerfd',
      selectedCity: 'grfdesg',
      selectedNacionalityType: 'grefsz',
      selectedState: 'gresdf',
      fecha_expedicion: new Date(),
      lugar_expedicion: 'gfsrefd',
      empresa: 'grefgs',
      representante: 'gsgrefgs',
      direccion: 'gsergs',
      telefono_2: 'gserfgs',
      email_1: 'gsergs',
      email_2: 'gsergfs',
      nro_cuenta: 'gsrgsr'
    })
    localStorage.setItem('dataLogin', JSON.stringify({
      rol: { rol: 'Administrador' }
    }))
    shareholdresForm.submitFormulario();
    expect(actionsSpy).toHaveBeenCalledWith(newShareholder({ shareholder: shareholdresForm.prepareDataShareholder }))
  })

  it('#goBack() should call the respective services', () => {
    spyOn(shareholderHared, 'setData')
    expect(shareholderHared.setData).not.toHaveBeenCalled()
    expect(shareholderService.fetchShareholdersList).not.toHaveBeenCalled()
    shareholdresForm.goBack();
    expect(shareholderHared.setData).toHaveBeenCalled()
    expect(shareholderService.fetchShareholdersList).toHaveBeenCalled()
  })

  it('#onOptionChangeCountry() should do nothing if selectedCountry.isoCode', () => {
    shareholdresForm.selectedCountry = { isoCode: undefined }
    expect(Boolean(shareholdresForm.selectedCountry.isoCode)).toBe(false)
    shareholdresForm.onOptionChangeCountry();
    expect(actionsSpy).not.toHaveBeenCalledWith(department({ country: shareholdresForm.selectedCountry }))

    shareholdresForm.selectedCountry = { isoCode: 'undefined' }
    shareholdresForm.onOptionChangeCountry();
    expect(actionsSpy).toHaveBeenCalledWith(department({ country: shareholdresForm.selectedCountry }))
    expect(shareholdresForm.departamento).toEqual(storeInitialStateMock.department.department)

  })

  it('#onOptionChangeCities() should dispatch cities action', () => {
    shareholdresForm.selectedCountry = { isoCode: undefined }
    shareholdresForm.selectedDepartment = { isoCode: undefined }
    expect(Boolean(shareholdresForm.selectedCountry.isoCode && shareholdresForm.selectedDepartment.isoCode)).toBe(false)
    let countryDepartment: countryCitiesInterface = {};
    countryDepartment.isoCode = shareholdresForm.selectedCountry.isoCode;
    countryDepartment.isoCodeDepartment = shareholdresForm.selectedDepartment.isoCode;
    shareholdresForm.onOptionChangeCities();
    expect(actionsSpy).not.toHaveBeenCalledWith(cities({ countryDepartment }))

    shareholdresForm.selectedCountry = { isoCode: 'undefined' }
    shareholdresForm.selectedDepartment = { isoCode: 'undefined' }
    countryDepartment.isoCode = shareholdresForm.selectedCountry.isoCode;
    countryDepartment.isoCodeDepartment = shareholdresForm.selectedDepartment.isoCode;
    shareholdresForm.onOptionChangeCities();
    expect(actionsSpy).toHaveBeenCalledWith(cities({ countryDepartment }))

  })

  it('#onOptionChangeCity() should change the selected city', () => {
    shareholdresForm.ciudad = [{ name: 'hola', isoCode: '12' }]
    shareholdresForm.selectedCity = { name: 'hola' }
    shareholdresForm.onOptionChangeCity();
    expect(shareholdresForm.selectedCity).toEqual({ name: 'hola', isoCode: '12' })
  })

  it('the ui should be always the same', () => {
    fixture.detectChanges()
    expect(shareholdresForm.task).toEqual('Creación')
    expect(fixture.nativeElement.querySelector('h1').textContent).toEqual('Creación de accionista')
  })

  it('primer_nombre input should change the form', () => {
    fixture.detectChanges();
    expect(shareholdresForm.form.get('primer_nombre').value).toEqual('')
    const input = fixture.nativeElement.querySelector(`input[id='primer_nombre']`);
    input.value = '22';
    input.dispatchEvent(new Event('input'));
    expect(shareholdresForm.form.get('primer_nombre').value).toEqual('22')
  })

})
