import * as CryptoJS from "crypto-js";
import * as FileSaver from "file-saver";

import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  UpdateState,
  exportCsvUsers,
  exportExcelUsers,
  exportPdfUsers,
} from "src/app/store/actions/user.action";

import { ConfirmationService } from "primeng/api";
import { FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user/user.service";
import { UserSharedDataService } from "src/app/services/user/userSharedData.service";
import { UsersList } from "src/app/model/usersList.model";
import autoTable from "jspdf-autotable";
import { environment } from "src/environments/environment";
import jsPDF from "jspdf";
import { ngxCsv } from "ngx-csv";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  viewForm: boolean = false;
  usersListState: UsersList[];
  usuarioSeleccionado;
  cols: any[] = [];
  exportColumns: any[];
  totRegistros: number = 0;
  permissions$ = this.store.select((state) => state.usersList.userlist);
  task: string = null;
  dataUser: UsersList;
  loadings: boolean = false;
  suscription: Subscription;
  dialogVisible = false;
  dialogText: string;
  action: string;

  constructor(
    private fg: FormBuilder,
    private router: Router,
    private store: Store<State>,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private userSharedDataService: UserSharedDataService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.store.dispatch(UpdateState());

    this.getUsersList();

    this.userSharedDataService.getData().subscribe((data) => {
      const encryptedDataFromLocalStorage =
        localStorage.getItem("dataInterface");
      if (encryptedDataFromLocalStorage) {
        // Descifrar la cadena cifrada utilizando la clave secreta
        const decryptedData = CryptoJS.AES.decrypt(
          encryptedDataFromLocalStorage,
          environment.secretKey
        );
        // Convertir la cadena descifrada en un objeto JSON
        const decryptedDataAsString = decryptedData.toString(CryptoJS.enc.Utf8);
        const decryptedObject = JSON.parse(decryptedDataAsString);

        this.viewForm = decryptedObject ? decryptedObject.viewForm : false;
        if (!this.viewForm) {
          this.usuarioSeleccionado = undefined;
        }
        this.action = data.task;
      }
    });

    this.cols = [
      { field: "PRIMER_NOMBRE", header: "PRIMER_NOMBRE" },
      { field: "SEGUNDO_NOMBRE", header: "SEGUNDO_NOMBRE" },
      { field: "PRIMER_APELLIDO", header: "PRIMER_APELLIDO" },
      { field: "SEGUNDO_APELLIDO", header: "SEGUNDO_APELLIDO" },
      { field: "DOCUMENTO", header: "DOCUMENTO" },
      { field: "TELEFONO", header: "TELEFONO" },
      { field: "EMAIL", header: "EMAIL" },
      { field: "Fn_role.NOMBRE", header: "Fn_role.NOMBRE" },
    ];
    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));

    this.suscription = this.userService.refresh$.subscribe(() => {
      this.getUsersList();
    });
  }

  public getUsersList(): void {
    this.userService.getUsersList().subscribe((users) => {
      if (users) {
        this.loadings = true;
        this.usersListState = users;
        this.totRegistros = users.length;
      }
    });
  }

  newUser() {
    this.userSharedDataService.setData(true, "new");
  }

  handleEditUser() {
    if (this.usuarioSeleccionado) {
      this.updateUser(this.usuarioSeleccionado);
    } else {
      this.confirmationService.confirm({
        key: "users",
        header: "Advertencia",
        message: "Debes seleccionar primero un accionista",
        icon: "pi pi-info-circle",
        acceptLabel: "Aceptar",
        rejectVisible: false,
      });
    }
  }

  updateUser(userData: UsersList) {
    this.userSharedDataService.setData(true, "edit");
    this.userSharedDataService.setIdUser(userData.ID);
  }

  exportExcel() {
    this.store.dispatch(exportExcelUsers({ payload: {} }));
  }

  exportCsv() {
    this.store.dispatch(exportCsvUsers({ payload: {} }));
  }

  exportPdf() {
    this.store.dispatch(exportPdfUsers({ payload: {} }));
  }
}
