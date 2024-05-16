import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import {
  UpdateState,
  UpdateUser,
  deleteUser,
  newUser,
} from "src/app/store/actions/user.action";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

import { ConfirmationService } from "primeng/api";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RolInterface } from "src/app/model/rol.model";
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { UserService } from "src/app/services/user/user.service";
import { UserSharedDataService } from "src/app/services/user/userSharedData.service";
import { UserState } from "src/app/store/reducers/user/user.reducer";
import { UsersComponent } from "../users.component";
import { UsersList } from "src/app/model/usersList.model";
import { subject } from "./../../../services/user/user.service";
import { userRol } from "src/app/store/actions/rol.action";

interface City {
  name: string;
  code: string;
}

@Component({
  selector: "app-usersForm",
  templateUrl: "./usersForm.component.html",
  styleUrls: ["./usersForm.component.css"],
  animations: [
    trigger("errorState", [
      state(
        "hidden",
        style({
          opacity: 0,
        })
      ),
      state(
        "visible",
        style({
          opacity: 1,
        })
      ),
      transition("visible => hidden", animate("400ms ease-in")),
      transition("hidden => visible", animate("400ms ease-out")),
    ]),
  ],
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  userData: Observable<UsersList>;
  task: string;
  taskString: string;
  prepareDataUser: UsersList = {};
  idUser: number = null;
  estateUser: number = null;

  loadings: boolean = false;
  permissions$ = this.store.select((state) => state.rolList);
  rolList: RolInterface[];
  selectedRol;
  idParam: number;
  stateParam: string;
  suscription: Subscription;
  editMode: boolean = true;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store<State>,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private location: Location,
    private fb: FormBuilder,
    private userSharedDataService: UserSharedDataService,
    private usercomponent: UsersComponent
  ) {
    this.form = this.fb.group({
      primer_nombre: ["", Validators.required],
      segundo_nombre: [""],
      primer_apellido: ["", Validators.required],
      segundo_apellido: [""],
      telefono: [""],
      documento: ["", Validators.required],
      email: ["", Validators.required],
      password: [this.editMode ? "" : "", this.editMode ? Validators.nullValidator : Validators.required],
      selectedRol: [this.editMode ? "" : "", this.editMode ? Validators.nullValidator : Validators.required] 
    });

    this.store.dispatch(UpdateState());
    this.store.dispatch(userRol());

    this.store.subscribe(({ rolList }) => {
      this.rolList = rolList.rolList;
    });

    this.store.subscribe(async ({ userState }) => {
      if (userState.status != null) {
        

        if (userState.error || userState.status === 403) {
          let message = userState.error ? userState.error : userState.msg;
          this.snackBar(message, userState.status);
        }

        if (userState.status === 200) {
          let snack = await this.snackBar(userState.msg, userState.status);
          if (await snack) {
            this.goBack();
          }
        }
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(UpdateState());
    this.userSharedDataService.getData().subscribe((valor) => {
      if (valor.task === "edit") {
        this.editMode = true;
        this.task = "Edición";
        this.userSharedDataService.getIdUser().subscribe(async (idUser) => {
          if (await idUser) {
            this.getUser(idUser);
          }
        });
      } else {
        this.loadings = true;
        this.task = "Creación";
        this.form.get("documento").setValue(null);
        this.form.get("telefono").setValue(null);
      }
    });

    this.permissions$.subscribe((permissions) => {
      if (permissions.rolList.length === 0) {
        this.store.dispatch(userRol());
      }
    });
  }

  getUser(id_user: number): void {
    this.userService.getUser(id_user).subscribe(async (user) => {
      
      if (user) {
        this.loadings = true;
        this.idUser = user.ID;
        this.form.get("primer_nombre").setValue(user.PRIMER_NOMBRE);
        this.form.get("segundo_nombre").setValue(user.SEGUNDO_NOMBRE);
        this.form.get("primer_apellido").setValue(user.PRIMER_APELLIDO);
        this.form.get("segundo_apellido").setValue(user.SEGUNDO_APELLIDO);
        this.form.get("documento").setValue(user.DOCUMENTO);
        this.form.get("telefono").setValue(user.TELEFONO);
        this.form.get("email").setValue(user.EMAIL);
        //this.form.get('selectedRol').setValue(await this.rolList.find(r => r.ID == user.ROLE));
        this.selectedRol = await this.rolList.find((r) => r.ID == user.ROLE);
        this.estateUser = user.ESTADOS;
      }
    });
  }

  public async submitFormulario() {
    let userPetition = JSON.parse(localStorage.getItem("dataLogin"));
    this.prepareDataUser = {
      PRIMER_NOMBRE: this.form.get("primer_nombre").value,
      SEGUNDO_NOMBRE: this.form.get("segundo_nombre").value,
      PRIMER_APELLIDO: this.form.get("primer_apellido").value,
      SEGUNDO_APELLIDO: this.form.get("segundo_apellido").value,
      DOCUMENTO: this.form.get("documento").value,
      TELEFONO: this.form.get("telefono").value,
      EMAIL: this.form.get("email").value,
      CLAVE: this.form.get("password").value,
      ROLE: parseInt(this.selectedRol.ID),
      ROLADMIN: userPetition.rol.rol,
      EMAILADMIN: userPetition.email,
    };
    if (this.selectedRol && this.selectedRol.ID) {
      this.prepareDataUser.ROLE = parseInt(this.selectedRol.ID);

    if (this.task == "Edición") {
      this.prepareDataUser.ID = await this.idUser;
      this.prepareDataUser.ESTADOS = this.estateUser;
      this.store.dispatch(UpdateUser({ user: this.prepareDataUser }));
    } else {
      this.store.dispatch(newUser({ user: this.prepareDataUser }));
    }
  }
  }

  public async deleteUser() {
    let userPetition = JSON.parse(localStorage.getItem("dataLogin"));
    this.prepareDataUser = {
      ID: this.idUser,
      ESTADOS: 0,
      ROLADMIN: userPetition.rol.rol,
      EMAILADMIN: userPetition.email,
    };
    this.store.dispatch(deleteUser({ user: this.prepareDataUser }));
  }

  goBack() {
    this.userSharedDataService.setData(false, null);
    localStorage.removeItem("dataEdit");
    this.usercomponent.getUsersList();
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      header: "Eliminación de usuario.",
      message:
        "¿Está seguro que desea eliminar el usuario " +
        this.form.get("primer_nombre").value +
        " " +
        this.form.get("primer_apellido").value +
        "?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Aceptar",
      acceptButtonStyleClass: "p-button-rounded p-button-sm",
      rejectButtonStyleClass: "p-button-rounded p-button-outlined p-button-sm",
      accept: () => {
        this.deleteUser();
      },
    });
  }

  addUser(event: Event) {
    if (this.form.valid) {
      this.confirmationService.confirm({
        header: "Creación de usuario.",
        message:
          "¿Está seguro que desea guardar el usuario " +
          this.form.get("primer_nombre").value +
          " " +
          this.form.get("primer_apellido").value +
          "?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: "p-button-rounded p-button-sm",
        rejectButtonStyleClass:
          "p-button-rounded p-button-outlined p-button-sm",
        accept: () => {
          this.submitFormulario();
        },
      });
    } else {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  public async snackBar(message, status) {
    let panelclass;

    if (status == 200) {
      panelclass = ["background-blue"];
    }

    if (status == 403) {
      panelclass = ["background-red"];
    }

    if (status) {
      await this._snackBar.open(message, "Cerrar", {
        duration: 4000,
        verticalPosition: "top",
        panelClass: panelclass,
      });

      return true;
    }
  }
}
