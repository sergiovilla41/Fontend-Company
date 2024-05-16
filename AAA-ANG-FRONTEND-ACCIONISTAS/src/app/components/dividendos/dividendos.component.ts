import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { ConfirmationService } from "primeng/api";
import { State } from "src/app/model/state.model";
import { AssemblyService } from "src/app/services/assembly/assembly.service";
import {
  addDividendo,
  cleanStateDividendo,
  distributeDividendo,
} from "src/app/store/actions/dividendo.action";
import { shareholderTypes } from "src/app/store/actions/shareholderType.action";

@Component({
  selector: "dividendos",
  templateUrl: "dividendos.component.html",
  styleUrls: ["dividendos.component.scss"],
})
export class DividendosComponent implements OnInit {
  busy = false;
  showSummary = false;
  showDistribucionDividendos = false;

  form = this.formBuilder.group({
    valorIntrinseco: [, Validators.required],
    valorNominal: [, Validators.required],
    valorDividendo: [, Validators.required],
    observacion: ["", Validators.required],
    NumeroCuotas1: [,],
    ObervacionAccionista1: [,],
    NumeroCuotas2: [,],
    ObervacionAccionista2: [,],
    NumeroCuotas3: [,],
    ObervacionAccionista3: [,],
  });

  tipoAccionista = this.store.select(
    (state) => state.shareholderTypeList.shareholdersTypesList
  );

  idAsamblea: string;
  formSubmitted = true;

  constructor(
    private formBuilder: FormBuilder,
    private assemblyService: AssemblyService,
    private store: Store<State>,
    private _snackBar: MatSnackBar,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.store.dispatch(shareholderTypes());
    this.assemblyService
      .getToEditAssembly()
      .subscribe((assembly: any) => (this.idAsamblea = assembly.ID_REGISTRO));
    this.store.subscribe(({ dividendo }) => {
      if (dividendo.status === 200) {
        this.snackBar(dividendo.msg, dividendo.status);
        this.showSummary = true;
        this.store.dispatch(cleanStateDividendo());
      }
    });
  }

  snackBar(message, status) {
    let panelclass;

    if (status == 200) {
      panelclass = ["background-blue"];
    }
    if (status == 403) {
      panelclass = ["background-red"];
    }
    if (status) {
      this._snackBar.open(message, "Cerrar", {
        duration: 4000,
        verticalPosition: "top",
        panelClass: panelclass,
      });
      return true;
    }
  }

  guardar() {
    if (this.form.valid) {
      this.confirmationService.confirm({
        header: "Dividendo",
        message: "¿Está seguro de crear la guardar el valor del dividendo?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: "p-button-rounded p-button-sm",
        rejectButtonStyleClass:
          "p-button-rounded p-button-outlined p-button-sm",
        key: "dividendos",
        accept: () => {
          this.formSubmitted = true;
          this.store.dispatch(
            addDividendo({
              dividendo: {
                ASAMBLEA_UUID: this.idAsamblea,
                EMAILADMIN: JSON.parse(localStorage.getItem("dataLogin")).email,
                ROLADMIN: JSON.parse(localStorage.getItem("dataLogin")).rol.rol,
                OBSERVACION: this.form.get("observacion").value,
                VALOR_DIVIDENDO: this.form.get("valorDividendo").value,
                VALOR_INTRINSECO: this.form.get("valorIntrinseco").value,
                VALOR_NOMINAL: this.form.get("valorNominal").value,
              },
            })
          );
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  distribuirDividendos() {
    if (this.formSubmitted) {
      this.showDistribucionDividendos = true;
    } else {
    }
  }

  distribuirDividendos2() {
    
    this.confirmationService.confirm({
      header: "Dividendo",
      message: "¿Está seguro de distribuir los dividendos?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Aceptar",
      acceptButtonStyleClass: "p-button-rounded p-button-sm",
      rejectButtonStyleClass: "p-button-rounded p-button-outlined p-button-sm",
      key: "dividendos",
      accept: () => {
        this.formSubmitted = true;
        this.tipoAccionista.subscribe(accionistas=>{
          this.store.dispatch(
            distributeDividendo({
              distribuirDividendo: {
                DATA: [
                  {
                    ASAMBLEA_UUID: this.idAsamblea,
                    CUOTAS: this.form.get("NumeroCuotas1").value,
                    OBSERVACION: this.form.get("ObervacionAccionista1").value,
                    TIPO_ACCIONISTA_UUID: accionistas[0].ID_REGISTRO,
                  },
                  {
                    ASAMBLEA_UUID: this.idAsamblea,
                    CUOTAS: this.form.get("NumeroCuotas2").value,
                    OBSERVACION: this.form.get("ObervacionAccionista2").value,
                    TIPO_ACCIONISTA_UUID: accionistas[1].ID_REGISTRO,
                  },
                  {
                    ASAMBLEA_UUID: this.idAsamblea,
                    CUOTAS: this.form.get("NumeroCuotas3").value,
                    OBSERVACION: this.form.get("ObervacionAccionista3").value,
                    TIPO_ACCIONISTA_UUID: accionistas[2].ID_REGISTRO,
                  }
                ],

                // NUMEROCUOTAS1: this.form.get('NumeroCuotas1').value,
                // NUMEROCUOTAS2: this.form.get('NumeroCuotas2').value,
                // NUMEROCUOTAS3: this.form.get('NumeroCuotas3').value,
                // OBSERVACION1: this.form.get('ObervacionAccionista1').value,
                // OBSERVACION2: this.form.get('ObervacionAccionista2').value,
                // OBSERVACION3: this.form.get('ObervacionAccionista3').value,
              },
            })
          );
        });

      },
    });
  }
}
