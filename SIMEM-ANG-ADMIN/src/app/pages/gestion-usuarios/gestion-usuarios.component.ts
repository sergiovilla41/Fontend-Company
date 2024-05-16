import { Component, OnInit } from "@angular/core";
import { GestionUsuariosTemplate } from "../../shared/components/templates/gestion-usuarios/gestion-usuarios-template.component";
import { Store } from "@ngrx/store";
import { State } from "../../store/model/state.model";
import { CommonModule } from "@angular/common";
import { selectColumns, selectEmpresDominioList, selectUserList } from "../../store/selectors/user/user.selector";
import { clearUserState, createUser, editUser, getCompanyDomain, getUserList } from "../../store/actions/user.action";
import { Columns } from "../../shared/components/organisms/editable-table/editable-table.component";
import { User } from "../../store/model/User.model";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'gestion-usuarios',
  standalone: true,
  templateUrl: 'gestion-usuarios.component.html',
  styleUrl: 'gestion-usuarios.component.scss',
  imports: [
    GestionUsuariosTemplate,
    CommonModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class GestionUsuariosComponent implements OnInit{
  users = this.store.select(selectUserList)
  empresaDominioList = this.store.select(selectEmpresDominioList)
  columns = this.store.select(selectColumns)
  syncColumns: Columns<User> = {
    nombre: {
      field: "nombre",
      header: "Nombre",
      type: "text"
    },
    correo: {
      field: "correo",
      header: "Correo",
      type: "text"
    },
    telefono: {
      field: "telefono",
      header: "Télefono",
      type: "text"
    },
    empresa: {
      field: "empresa",
      header: "Empresa",
      type: "select",
      options: [],
      editable: false
    },
    observacion: {
      field: "observacion",
      header: "Observación",
      type: "text"
    },
    app: {
      field: "app",
      header: "Aplicación",
      type: "select",
      options: [
        {
          value: "Pendiente Registro",
          label: "Pendiente Registro"
        }, {
          value: "Terceros",
          label: "Terceros"
        },
        {
          value: "SIMEM",
          label: "Administrador SIMEM"
        }
      ]
    },
    permisos: {
      field: "permisos",
      header: "Permisos",
      type: "select",
      options: [
        {
          value: "Pendiente Registro",
          label: "Pendiente Registro"
        }, {
          value: "Escritura",
          label: "Escritura"
        }, {
          value: "Lectura",
          label: "Lectura"
        }
      ]
    },
    estado: {
      field: "estado",
      header: "Estado",
      type: "select",
      options: [
        {
          value: "Pendiente Registro",
          label: "Pendiente Registro"
        }, {
          value: "No procede",
          label: "No procede"
        }, {
          value: "Activo",
          label: "Activo"
        }, {
          value: "Inactivo",
          label: "Inactivo"
        }
      ]
    },
    fechaIniUsuario: {
      field: "fechaIniUsuario",
      header: "Fecha Inicio Usuario",
      type: "calendar"
    },
    fechaFinUsuario: {
      field: "fechaFinUsuario",
      header: "Fecha Fin Usuario",
      type: "calendar"
    }
  }

  constructor(private store: Store<State>, private messageService: MessageService){}

  ngOnInit(): void {
    this.store.dispatch(getCompanyDomain())
    this.store.select((state: State) => state.user.updatedUser).subscribe(updated => {
      if(updated){
        this.messageService.add({key: "users", detail: "Usuario actualizado satisfactoriamente", summary: "Actualización", severity: "success"})
        this.store.dispatch(clearUserState())
      }

    })
    this.store.select((state: State) => state.user.createdUser).subscribe(updated => {
      if(updated){
        this.messageService.add({key: "users", detail: "Usuario creado satisfactoriamente", summary: "Creación", severity: "success"})
        this.store.dispatch(clearUserState())
      }
    })
  }

  fetchUsers(){
    this.store.dispatch(getUserList())
  }

  createUser(user: User){
    this.store.dispatch(createUser({user}))
  }

  editUser(user: User){
    this.store.dispatch(editUser({user}))
  }
}
