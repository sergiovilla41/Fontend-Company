import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { BackButtonComponent } from "../../atoms/back-button/back-button.component";
import { Columns, CustomError, EditableTable, IForm } from "../../organisms/editable-table/editable-table.component";
import { User } from "../../../../store/model/User.model";
import { FormBuilder, FormControl, ValidationErrors, Validators } from "@angular/forms";
import { EmpresaDominio } from "../../../../store/model/EmpresaDominio";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'gestion-usuarios-template',
  standalone: true,
  templateUrl: 'gestion-usuarios-template.component.html',
  styleUrl: 'gestion-usuarios-template.component.scss',
  imports: [
    BackButtonComponent,
    EditableTable,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class GestionUsuariosTemplate {
  @Input({ required: true }) users!: User[]
  @Input({ required: true }) empresaDominioList!: EmpresaDominio[]
  @Input({ required: true }) columns!: Columns<User>
  @Output() onFetchUsers = new EventEmitter<void>()
  @Output() onEdit = new EventEmitter<User>()
  @Output() onCreate = new EventEmitter<User>()

  form: IForm<User> = {
    nombre: ["", Validators.required],
    app: ["", Validators.required],
    estado: ["", Validators.required],
    fechaFinUsuario: ["", Validators.required],
    fechaIniUsuario: ["", Validators.required],
    observacion: [""],
    permisos: ["", Validators.required],
    telefono: ["", Validators.required],
    correo: ["", {
      validators: [Validators.required, this.validateCorreo.bind(this)],
      updateOn: 'blur',
    }],
    empresa: [{
      value: "",
      disabled: true
    }]
  }

  errors: CustomError[] = [{
    code: 'invalidCorreo',
    message: 'No se encuentra relación del dominio ingresado con empresa.'
  }]

  validateCorreo(correo: FormControl) {
    let dominio = correo.value?.split("@")[1]
    if (this.empresaDominioList) {
      const empresaDominio = this.empresaDominioList.find(a => a.seguridadDominio.dominio === dominio)
      if (correo.value && correo.value !== "" && !empresaDominio) {
        return { invalidCorreo: true }
      } else if (correo.value !== "") {
        this.formGroup.get("empresa")?.setValue(empresaDominio?.empresa.nombre)
      }
    }
    return null
  }

  editForm: IForm<User> = {
    app: ["", Validators.required],
    estado: ["", Validators.required],
    permisos: ["", Validators.required],
    fechaIniUsuario: ["", Validators.required],
    fechaFinUsuario: ["", Validators.required]
  }

  formGroup = this.formBuilder.group(this.form)
  editFormGroup = this.formBuilder.group(this.editForm)

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) {
    this.formGroup.get("correo")?.touched
  }

  create(user: User) {
    this.onCreate.emit(user)
  }

  edit(user: User) {
    this.onEdit.emit(user)
  }

  fetchUsers() {
    this.onFetchUsers.emit()
  }
}
