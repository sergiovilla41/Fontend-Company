import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Shareholders } from 'src/app/model/shareholders.model';
import { State } from 'src/app/model/state.model';
import { TypesInterface } from 'src/app/model/types.model';
import { accountType } from 'src/app/store/actions/accountType.action';
import { bank } from 'src/app/store/actions/bank.action';
import { identificationType } from 'src/app/store/actions/identificationType.action';
import { nacionalityType } from 'src/app/store/actions/nacionalityType.action';
import { personTypes } from 'src/app/store/actions/personType.action';
import { newShareholder, UpdateShareholder, UpdateStateShareholder } from 'src/app/store/actions/shareholder.action';
import { shareholderTypes } from 'src/app/store/actions/shareholderType.action';
import { stateTrue } from 'src/app/store/actions/state.action';
import { typeOfFiler } from 'src/app/store/actions/typeOfFiler.action';
import { shareholderState } from 'src/app/store/reducers/shareholder/shareholder.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareholderharedDataService } from 'src/app/services/shareholders/shareholderSharedData.service';
import { ShareholdersService } from 'src/app/services/shareholders/shareholders.service';
import { ShareholdersComponent } from '../shareholders.component'
import { take } from 'rxjs';
import { countryCitiesInterface } from 'src/app/model/countryCities.model';
import { country } from 'src/app/store/actions/country.action';
import { department } from 'src/app/store/actions/department.action';
import { cities } from 'src/app/store/actions/city.action';


@Component({
  selector: 'app-shareholdresForm',
  templateUrl: './shareholdresForm.component.html',
  styleUrls: ['./shareholdresForm.component.css']
})
export class ShareholdresFormComponent implements OnInit {

  idParam: number;
  stateParam: string;
  task: string;
  loadings: boolean = false;
  maxDate: Date = new Date();
  prepareDataShareholder: Shareholders = {};
  status: shareholderState;
  form: FormGroup;
  fecha_expedicion: Date;

  permissionsPersonType$ = this.store.select(state => state.personTypeList);
  tipo_persona: TypesInterface[];
  selectedPersonType;

  permissionsShareholderType$ = this.store.select(state => state.shareholderTypeList);
  tipo_accionista: TypesInterface[];
  selectedShareholderType;

  permissionsTypeOfFiler$ = this.store.select(state => state.typeOfFilerList);
  tipo_declarante: TypesInterface[];
  selectedTypeOfFiler;

  permissionsIdentificationtype$ = this.store.select(state => state.identificationTypeList);
  tipo_documento: TypesInterface[];
  selectedIdentificationtype;

  permissionsBank$ = this.store.select(state => state.bankList);
  banco: TypesInterface[];
  selectedBank;

  permissionsaccountType$ = this.store.select(state => state.accountTypeList);
  tipo_cuenta: TypesInterface[];
  selectedaccountType;

  permissionsNacionalityType$ = this.store.select(state => state.nacionalityTypeList);
  nacionalidad: TypesInterface[];
  selectedNacionalityType;

  permissionsStateTrue$ = this.store.select(state => state.state);
  estado: TypesInterface[];
  selectedState;

  permissionsCountry$ = this.store.select(state => state.country);
  pais: countryCitiesInterface[];
  selectedCountry;

  permissionsDepartment$ = this.store.select(state => state.department);
  departamento: countryCitiesInterface[];
  selectedDepartment;

  permissionsCity$ = this.store.select(state => state.city);
  ciudad: countryCitiesInterface[];
  selectedCity;

  idShareholder: string = null;

  constructor(private _snackBar: MatSnackBar,
    private store: Store<State>,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private shareholderharedDataService: ShareholderharedDataService,
    private shareholdersService: ShareholdersService) {

    this.form = this.fb.group({
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      selectedIdentificationtype: ['', Validators.required],
      identificacion: ['', Validators.required],
      selectedPersonType: ['', Validators.required],
      selectedShareholderType: ['', Validators.required],
      telefono_1: ['', Validators.required],
      selectedCountry: ['', Validators.required],
      selectedDepartment: ['', Validators.required],
      selectedCity: ['', Validators.required],
      selectedNacionalityType: ['', Validators.required],
      selectedState: ['', Validators.required],
      fecha_expedicion: [''],
      lugar_expedicion: [''],
      empresa: [''],
      representante: [''],
      direccion: [''],
      telefono_2: [''],
      email_1: [''],
      email_2: [''],
      nro_cuenta: [''],
    });

  }

  ngOnInit() {
    this.store.dispatch(personTypes());
    this.store.dispatch(shareholderTypes());
    this.store.dispatch(typeOfFiler());
    this.store.dispatch(identificationType());
    this.store.dispatch(bank());
    this.store.dispatch(accountType());
    this.store.dispatch(nacionalityType());
    this.store.dispatch(stateTrue());
    this.store.dispatch(country());

    this.shareholderharedDataService.getData().subscribe(valor => {

      if (valor.task === 'edit') {

        this.task = "Edición"

        this.shareholderharedDataService.getIdShareholder().subscribe(async idShareholder => {
          if (idShareholder) {
            this.getShareholder(idShareholder)
          }
        });
      } else {
        this.loadings = true;
        this.task = "Creación"
        this.form.get('identificacion').setValue(null);
        this.form.get('telefono_1').setValue(null);
        this.form.get('telefono_2').setValue(null);
        this.form.get('nro_cuenta').setValue(null);
      }

    });

    this.store.dispatch(UpdateStateShareholder());

    this.store.subscribe(({ personTypeList }) => {
      this.tipo_persona = personTypeList.personTypesList;
    });

    this.store.subscribe(({ shareholderTypeList }) => {
      this.tipo_accionista = shareholderTypeList.shareholdersTypesList;
    });

    this.store.subscribe(({ typeOfFilerList }) => {
      this.tipo_declarante = typeOfFilerList.typeOfFilerList;
    });

    this.store.subscribe(({ identificationTypeList }) => {
      this.tipo_documento = identificationTypeList.identificationTypeList;
    });

    this.store.subscribe(({ bankList }) => {
      this.banco = bankList.bankList;
    });

    this.store.subscribe(({ accountTypeList }) => {
      this.tipo_cuenta = accountTypeList.accountTypeList;
    });

    this.store.subscribe(({ nacionalityTypeList }) => {
      this.nacionalidad = nacionalityTypeList.nacionalityTypeList;
    });

    this.store.subscribe(({ state }) => {
      this.estado = state.stateTrue;
    });

    this.store.subscribe(({ country }) => {
      this.pais = country.country;
    });

    this.store.subscribe(async ({ shareholderList }) => {
      this.status = shareholderList;

      if (this.status.error || this.status.status === 403) {
        let message = shareholderList.error ? shareholderList.error : shareholderList.msg
        this.snackBar(message, shareholderList.status);
      }

      if (this.status.status === 200) {
        let snack = await this.snackBar(shareholderList.msg, shareholderList.status);

        if (snack) {
          this.store.dispatch(UpdateStateShareholder());
          this.goBack();
        }
      }
    });

  }

  getShareholder(idShareholder: string): void {

    this.shareholdersService.getShareholder(idShareholder).pipe(take(1)).subscribe(async shareholder => {

      if (shareholder) {

        // trae el departamento
        if (shareholder.PAIS) {
          let country: countryCitiesInterface = {};
          country.isoCode = shareholder.PAIS;
          this.store.dispatch(department({ country: country }));
          this.store.subscribe(({ department }) => {
            this.departamento = department.department;
            this.selectedDepartment = this.departamento.find(r => r.isoCode == shareholder.DEPARTAMENTO);

          });
        }

        // trae la ciudad
        if (shareholder.PAIS && shareholder.DEPARTAMENTO) {
          let countryDepartment: countryCitiesInterface = {};
          countryDepartment.isoCode = shareholder.PAIS;
          countryDepartment.isoCodeDepartment = shareholder.DEPARTAMENTO;
          this.store.dispatch(cities({ countryDepartment: countryDepartment }));
          this.store.subscribe(({ city }) => {
            this.ciudad = city.city;
            this.selectedCity = this.ciudad.find(r => r.name == shareholder.CIUDAD);
          });
        }

        this.idShareholder = shareholder.ID_REGISTRO;
        this.form.get('primer_nombre').setValue(shareholder.PRIMER_NOMBRE);
        this.form.get('segundo_nombre').setValue(shareholder.SEGUNDO_NOMBRE);
        this.form.get('primer_apellido').setValue(shareholder.PRIMER_APELLIDO);
        this.form.get('segundo_apellido').setValue(shareholder.SEGUNDO_APELLIDO);

        
        this.selectedPersonType = this.tipo_persona.find(r => r.ID_REGISTRO == shareholder.pe.ID_REGISTRO);
        this.selectedShareholderType = this.tipo_accionista.find(r => r.ID_REGISTRO == shareholder.ta.ID_REGISTRO);
        this.selectedIdentificationtype = this.tipo_documento.find(r => r.ID_REGISTRO == shareholder.Fn_tipo_documento.ID_REGISTRO);
        this.form.get('identificacion').setValue(shareholder.IDENTIFICACION);
        this.fecha_expedicion = shareholder.FECHA_EXPEDICION ? new Date(shareholder.FECHA_EXPEDICION) : null;
        this.form.get('lugar_expedicion').setValue(shareholder.LUGAR_EXPEDICION);
        this.selectedTypeOfFiler = shareholder.Fn_tipo_declarante ? this.tipo_declarante.find(r => r.ID_REGISTRO == shareholder.Fn_tipo_declarante.ID_REGISTRO) : null;
        this.form.get('empresa').setValue(shareholder.EMPRESA);
        this.form.get('representante').setValue(shareholder.REPRESENTANTE);
        this.form.get('direccion').setValue(shareholder.DIRECCION);
        this.form.get('telefono_1').setValue(shareholder.TELEFONO_1);
        this.form.get('telefono_2').setValue(shareholder.TELEFONO_2);
        this.form.get('email_1').setValue(shareholder.EMAIL_1);
        this.form.get('email_2').setValue(shareholder.EMAIL_2);
        this.selectedBank = shareholder.Fn_banco ? this.banco.find(r => r.ID_REGISTRO == shareholder.Fn_banco.ID_REGISTRO) : null;
        this.selectedCountry = this.pais.find(r => r.isoCode == shareholder.PAIS);
        this.selectedaccountType = shareholder.Fn_tipo_cuentum ? this.tipo_cuenta.find(r => r.ID_REGISTRO == shareholder.Fn_tipo_cuentum.ID_REGISTRO) : null;
        this.form.get('nro_cuenta').setValue(shareholder.NRO_CUENTA);
        this.selectedNacionalityType = shareholder.nacio ? this.nacionalidad.find(r => r.ID_REGISTRO == shareholder.nacio.ID_REGISTRO) : null;
        this.selectedState = this.estado.find(r => r.ID_REGISTRO == shareholder.Fn_estado.ID_REGISTRO);
        this.loadings = true;
      }

    })
  }

  public async submitFormulario() {

    const dia = this.form.get('fecha_expedicion').value ? this.form.get('fecha_expedicion').value.getDate() : null;
    const mes = this.form.get('fecha_expedicion').value ? this.form.get('fecha_expedicion').value.getMonth() + 1 : null;
    const año = this.form.get('fecha_expedicion').value ? this.form.get('fecha_expedicion').value.getFullYear() : null;

    const fechaFormateada = this.form.get('fecha_expedicion').value ? `${dia}-${mes}-${año}` : null;
    let userPetition = JSON.parse(localStorage.getItem("dataLogin"))
    this.prepareDataShareholder = {
      ROLADMIN: userPetition.rol.rol,
      EMAILADMIN: userPetition.email,
      PRIMER_NOMBRE: this.form.get('primer_nombre').value ? this.form.get('primer_nombre').value.toLowerCase() : '',
      SEGUNDO_NOMBRE: this.form.get('segundo_nombre').value ? this.form.get('segundo_nombre').value.toLowerCase() : '',
      PRIMER_APELLIDO: this.form.get('primer_apellido').value ? this.form.get('primer_apellido').value.toLowerCase() : '',
      SEGUNDO_APELLIDO: this.form.get('segundo_apellido').value ? this.form.get('segundo_apellido').value.toLowerCase() : '',
      TIPO_DOCUMENTO_UUID: this.selectedIdentificationtype?.ID_REGISTRO,
      IDENTIFICACION: this.form.get('identificacion').value,
      FECHA_EXPEDICION: fechaFormateada,
      LUGAR_EXPEDICION: this.form.get('lugar_expedicion').value ? this.form.get('lugar_expedicion').value.toLowerCase() : '',
      TIPO_PERSONA_UUID: this.selectedPersonType?.ID_REGISTRO,
      TIPO_ACCIONISTA_UUID: this.selectedShareholderType?.ID_REGISTRO,
      TIPO_DECLARANTE_UUID: this.selectedTypeOfFiler ? this.selectedTypeOfFiler?.ID_REGISTRO : '',
      EMPRESA: this.form.get('empresa').value ? this.form.get('empresa').value.toLowerCase() : '',
      REPRESENTANTE: this.form.get('representante').value ? this.form.get('representante').value.toLowerCase() : '',
      DIRECCION: this.form.get('direccion').value ? this.form.get('direccion').value.toLowerCase() : '',
      TELEFONO_1: this.form.get('telefono_1').value ? this.form.get('telefono_1').value : '',
      TELEFONO_2: this.form.get('telefono_2').value ? this.form.get('telefono_2').value : '',
      EMAIL_1: this.form.get('email_1').value ? this.form.get('email_1').value.toLowerCase() : '',
      EMAIL_2: this.form.get('email_2').value ? this.form.get('email_2').value.toLowerCase() : '',
      PAIS: this.selectedCountry ? this.selectedCountry.isoCode : '',
      DEPARTAMENTO: this.selectedDepartment ? this.selectedDepartment.isoCode : '',
      CIUDAD: this.selectedCity ? this.selectedCity.name : '',
      BANCO_UUID: this.selectedBank ? this.selectedBank?.ID_REGISTRO : '',
      TIPO_CUENTA_UUID: this.selectedaccountType ? this.selectedaccountType?.ID_REGISTRO : '',
      NRO_CUENTA: this.form.get('nro_cuenta').value ? this.form.get('nro_cuenta').value : '',
      NACIONALIDAD_UUID: this.selectedNacionalityType?.ID_REGISTRO,
      ESTADO_UUID: this.selectedState?.ID_REGISTRO
    };

    if (this.task == 'Edición') {
      this.prepareDataShareholder.ID_REGISTRO = this.idShareholder;
      this.store.dispatch(UpdateShareholder({ shareholder: this.prepareDataShareholder }));
    } else {
      this.store.dispatch(newShareholder({ shareholder: this.prepareDataShareholder }));
    }

  }


  addShareholder() {

    if (this.form.valid) {

      this.confirmationService.confirm({
        header: 'Creación de accionista.',
        message: '¿Está seguro que desea guardar el accionista ' + this.form.get('primer_nombre').value + ' ' + this.form.get('primer_apellido').value + ' ?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: 'p-button-rounded p-button-sm',
        rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
        accept: () => {
          this.submitFormulario();
        }
      });

    } else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }

  }

  goBack() {
    this.shareholderharedDataService.setData(false, null);
    this.shareholdersService.fetchShareholdersList();
  }

  onOptionChangeCountry() {
    let country: countryCitiesInterface = {};
    country.isoCode = this.selectedCountry.isoCode;

    if (this.selectedCountry.isoCode) {
      this.store.dispatch(department({ country: country }));

      this.store.subscribe(({ department }) => {
        this.departamento = department.department;
      });
    }
  }

  onOptionChangeCities() {

    if (this.selectedCountry.isoCode && this.selectedDepartment.isoCode) {
      const selectedDepartmentCode = this.selectedDepartment.isoCode;
      let countryDepartment: countryCitiesInterface = {};
      countryDepartment.isoCode = this.selectedCountry.isoCode;
      countryDepartment.isoCodeDepartment = this.selectedDepartment.isoCode;

      this.store.dispatch(cities({ countryDepartment: countryDepartment }));
      this.store.subscribe(({ city }) => {
        this.selectedDepartment = this.departamento?.find(r => r.isoCode === selectedDepartmentCode);
        this.ciudad = city?.city;
      });
    }
  }

  onOptionChangeCity() {

    const selectedCityName = this.selectedCity.name;
    this.selectedCity = this.ciudad.find(r => r.name === selectedCityName);

  }

  public async snackBar(message, status) {
    let panelclass;

    if (status == 200) {
      panelclass = ["background-blue"]
    }

    if (status == 403) {
      panelclass = ["background-red"]
    }

    if (status) {
      this._snackBar.open(message, 'Cerrar', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: panelclass
      });

      return true;
    }

  }


}
