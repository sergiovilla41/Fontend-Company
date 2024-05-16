import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { PaymentSharedDataServiceService } from 'src/app/services/payment/paymentSharedDataService.service';
import { take } from 'rxjs';
import { Payment } from 'src/app/model/payment.model';
import { UpdateStatePayment, updatePayment } from 'src/app/store/actions/payment.action';
import { paymentState } from 'src/app/store/reducers/payment/payment.reducer';

@Component({
  selector: 'app-paymentForm',
  templateUrl: './paymentForm.component.html',
  styleUrls: ['./paymentForm.component.css']
})
export class PaymentFormComponent implements OnInit {

  task: string;
  loadings: boolean = false;
  status: paymentState;
  form: FormGroup;
  maxDate: Date = new Date();
  fecha_pago: Date;
  idPayment: string = null;
  prepareDataPayment: Payment = {};

  constructor(private _snackBar: MatSnackBar,
    private store: Store<State>,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder, 
    private paymentService: PaymentService,
    private paymentSharedDataServiceService: PaymentSharedDataServiceService) {

      this.form = this.fb.group({
        beneficiario: [''],
        concepto: [''],
        fecha_pago: [''],
        comprobante: [''],
        retencion: [''],
      });



     }

  ngOnInit() {
    this.store.dispatch(UpdateStatePayment());

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
          this.goBack();
        }
      }
    });

    this.paymentSharedDataServiceService.getData().subscribe(valor => {
    
      if (valor.task === 'edit') {
        this.task = "Edición"

        this.paymentSharedDataServiceService.getIdPayment().subscribe(async idPayment => {
          if (idPayment) {
            this.getPayment(idPayment)
          }
        });

        this.loadings = true;

      }

    });



  }


  goBack() {
    this.paymentSharedDataServiceService.setData(false, null);
    this.paymentService.fetchPaymentList();
  }


  getPayment(idPayment: string): void {

    this.paymentService.getPayment(idPayment).pipe(take(1)).subscribe(async payment => {

      if (payment) {
        
        this.idPayment = payment.ID_REGISTRO;
        this.fecha_pago = payment.FECHAPAGO ? new Date(payment.FECHAPAGO) : null;
        this.form.get('beneficiario').setValue(payment.BENEFICIA);
        this.form.get('concepto').setValue(payment.CONCEPTO);
        this.form.get('comprobante').setValue(payment.COMPROBANTE);
        this.form.get('retencion').setValue(payment.RETENCION);

        this.loadings = true;

      }

    })
  }

  addPayment() {

    if (this.form.valid) {

      this.confirmationService.confirm({
        header: 'Edición de Pago',
        message: '¿Está seguro que desea guardar el pago?',
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


  public async submitFormulario() {

    const diaFechaPago = this.form.get('fecha_pago').value ? this.form.get('fecha_pago').value.getDate() : null;
    const mesFechaPago = this.form.get('fecha_pago').value ? this.form.get('fecha_pago').value.getMonth() + 1 : null;
    const añoFechaPago = this.form.get('fecha_pago').value ? this.form.get('fecha_pago').value.getFullYear() : null;
    const fechaPagoFormateada = this.form.get('fecha_pago').value ? `${diaFechaPago}-${mesFechaPago}-${añoFechaPago}` : null;

    let userPetition = JSON.parse(localStorage.getItem("dataLogin"))

    this.prepareDataPayment = {
      ID_REGISTRO: this.idPayment,
      BENEFICIARIO: this.form.get('beneficiario').value ? this.form.get('beneficiario').value.toLowerCase() : '',
      CONCEPTO: this.form.get('concepto').value ? this.form.get('concepto').value.toLowerCase() : '',
      FECHA_PAGO: fechaPagoFormateada,
      COMPROBANTE: this.form.get('comprobante').value ? this.form.get('comprobante').value.toLowerCase() : '',
      RETENCION: this.form.get('retencion').value ? this.form.get('retencion').value : 0,
      EMAILADMIN: userPetition.email,
      ROLADMIN: userPetition.rol.rol
    };

      
      this.store.dispatch(updatePayment({ payment: this.prepareDataPayment }));

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
