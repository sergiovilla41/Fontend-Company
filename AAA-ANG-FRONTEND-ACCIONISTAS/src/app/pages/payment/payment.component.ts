import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';
import { Filtro, TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { Subscription } from 'rxjs';
import { Payment } from 'src/app/model/payment.model';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { PaymentSharedDataServiceService } from 'src/app/services/payment/paymentSharedDataService.service';
import { paymentState } from 'src/app/store/reducers/payment/payment.reducer';
import { UpdateStatePayment, deletePayment } from 'src/app/store/actions/payment.action';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import axios from 'axios';
import { FileUpload } from 'primeng/fileupload';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  noFile: boolean = true;
  progress: boolean = false;
  visible: boolean;
  status: paymentState;
  prepareDataPayment: Payment = {};
  loadings: boolean = true;
  loadingsTable: boolean = true;
  cols: any[] = [];
  exportColumns: any[];
  paymentListState: Payment[];
  paymentSeleccionado: Payment;
  totRegistros: number = 0;
  suscription: Subscription;
  viewForm: boolean = false;
  tablaCargar: TablaCargar = {
    first: 0,
    rows: 50,
    orderCampo: undefined,
    tipoOrder: TipoOrder.ASC
  };
  isAddPaymentOpen: boolean;
  isEditPaymentOpen: boolean;
  action: string;
  uploadedFiles: any[] = [];
  uploadedErrorData: any[] = [];
  uploadedSuccessData: any[] = [];
  public isUploadClicked = false;
  @ViewChild('fileUpload') fileUpload: FileUpload;


  constructor(
    private fg: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private store: Store<State>,
    private _snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private paymentService: PaymentService,
    private paymentSharedDataServiceService: PaymentSharedDataServiceService
  ) { }

  ngOnInit() {

    this.paymentService.getPaymentList(this.tablaCargar).subscribe(payment => {
      if (payment) {
        this.loadings = true
        this.paymentListState = payment.rows;
        this.totRegistros = payment.count;
        this.loadingsTable = false;
      }
    }, error => {
      this.loadingsTable = false;
    })

    this.getPeymentList();


    this.suscription = this.paymentService.refresh$.subscribe(() => {
      this.getPeymentList();
    })

    this.paymentSharedDataServiceService.getData().subscribe(data => {
      const encryptedDataFromLocalStorage = localStorage.getItem('paymentDataInterface');
      if (encryptedDataFromLocalStorage) {
        // Descifrar la cadena cifrada utilizando la clave secreta
        const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromLocalStorage, environment.secretKey);
        // Convertir la cadena descifrada en un objeto JSON
        const decryptedDataAsString = decryptedData.toString(CryptoJS.enc.Utf8);
        const decryptedObject = JSON.parse(decryptedDataAsString);

        this.viewForm = decryptedObject ? decryptedObject.viewForm : false;

        if (!this.viewForm) {
          this.paymentSeleccionado = undefined;
        }
        this.action = data.task;
      }
    })


    this.store.subscribe(async ({ paymentList }) => {
      this.status = paymentList;
      if (this.status.error || this.status.status === 403) {
        let message = paymentList.error ? paymentList.error : paymentList.msg
        this.snackBar(message, paymentList.status);
      }

      if (this.status.status === 200) {
        let snack = await this.snackBar(paymentList.msg, paymentList.status);

        if (snack) {
          this.store.dispatch(UpdateStatePayment());
          this.getPeymentList();
        }
      }
    });


  }

  loadCustomers(event: LazyLoadEvent) {

    this.loadingsTable = true;

    const filterValues: Filtro[] = [];

    Object.keys(event.filters).forEach(key => {
      if (event.filters[key].value !== null && event.filters[key].value != "") {
        filterValues.push({
          columna: key,
          valor: event.filters[key].value
        })
      }
    });

    this.tablaCargar = {
      first: event.first,
      rows: event.rows,
      orderCampo: event.sortField,
      tipoOrder: event.sortOrder == 1 ? TipoOrder.ASC : TipoOrder.DESC,
      filtro: filterValues
    };

    this.paymentService.setPaginador(this.tablaCargar)

    this.getPeymentList();
  }

  getPeymentList(): void {
    this.paymentService.fetchPaymentList();
  }

  onRowSelect(event: any) {
    //this.updateAssembly(this.assemblySeleccionado)
  }

  onUpload(fileUpload: any): void {

    
    this.store.dispatch(UpdateStatePayment());

    const files = fileUpload.files;

    if (files.length === 0) {
      this.noFile = false;
      return;
    } else {
      this.noFile = true;
      this.progress = true;
    }

    const file = files[0];

    const formData = new FormData();
    formData.append('file', file);

    axios.post(environment.urlApi + 'createPayment', formData)
      .then(response => {
        this.progress = false;

        this.uploadedErrorData = response.data.msgFail;
        this.uploadedSuccessData = response.data.msgSuccess;
        this.getPeymentList();
        this.store.dispatch(UpdateStatePayment());

      })
      .catch(error => {
        this.snackBarMassive('Error al cargar el archivo', 500);
        console.error(error);
      });
  }


  onHideDialog(): void {
    this.uploadedErrorData = [];
    this.uploadedSuccessData = [];
    this.fileUpload.clear(); 
  }



  newPayment() {
    this.visible = true;
  }

  handlePayment() {
    if (this.paymentSeleccionado) {
      this.updatePayment(this.paymentSeleccionado)
    } else {
      this.confirmationService.confirm({
        key: 'pago',
        header: 'Advertencia',
        message: "Debes seleccionar primero un pago.",
        icon: 'pi pi-info-circle',
        acceptLabel: 'Aceptar',
        rejectVisible: false
      })
    }
  }

  updatePayment(payment: Payment) {
    this.paymentSharedDataServiceService.setData(true, 'edit');
    this.paymentSharedDataServiceService.setIdPayment(payment.PAGO_UUID);
  }

  handleDeletePayment() {
    if (this.paymentSeleccionado) {
      
      this.confirmationService.confirm({
        key: 'EliminarPago',
        header: 'Advertencia',
        message: '¿Está seguro que desea eliminar el pago con el beneficiario ' + this.paymentSeleccionado.NOPRIDOCU + ' y el comprobante nro. ' + this.paymentSeleccionado.NOCOMPRO + ' ?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: 'p-button-rounded p-button-sm',
        rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
        accept: () => {

          let userPetition = JSON.parse(localStorage.getItem("dataLogin"))

          this.prepareDataPayment = {
            ID_REGISTRO: this.paymentSeleccionado.PAGO_UUID,
            EMAILADMIN: userPetition.email,
            ROLADMIN: userPetition.rol.rol
          }

          this.deletePayment(this.prepareDataPayment);

        }
      });
    } else {
      this.confirmationService.confirm({
        key: 'pago',
        header: 'Advertencia',
        message: "Debes seleccionar primero un pago.",
        icon: 'pi pi-info-circle',
        acceptLabel: 'Aceptar',
        rejectVisible: false
      })
    }
  }

  deletePayment(payment: Payment) {
    this.store.dispatch(deletePayment({ payment: payment }));
  }


  exportExcel() {
  }

  exportCsv() {
  }

  exportPdf() {
  }


  showModalData(type: number) {
    let message;
    let header;

    switch (type) {
      case 1:
        message = this.paymentSeleccionado.BENEFICIARIO;
        header = 'BENEFICIARIO';
        break;
      case 2:
        message = this.paymentSeleccionado.CONCEPTO;
        header = 'CONCEPTO';
        break;
    }

    this.confirmationService.confirm({
      key: 'DataTable',
      header: header,
      message: message,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Aceptar',
      rejectVisible: false
    })
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

  public async snackBarMassive(message, status) {
    let panelclass;

    if (status == 200) {
      panelclass = ["background-blue"]
    }

    if (status == 403) {
      panelclass = ["background-red"]
    }

    if (status) {
      this._snackBar.open(message, 'Cerrar', {
        duration: 6000,
        verticalPosition: 'top',
        panelClass: panelclass
      });

      return true;
    }

  }


}
