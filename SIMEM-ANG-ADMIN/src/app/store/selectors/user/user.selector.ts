import { Columns } from "../../../shared/components/organisms/editable-table/editable-table.component";
import { User } from "../../model/User.model";
import { State } from "../../model/state.model";

export const selectUserList = (state: State) => state.user.userList
export const selectEmpresDominioList = (state: State) => state.user.empresaDominioList
export const selectColumns = (state: State): Columns<User> => {
  const empresaDominio = state.user.empresaDominioList
  return {
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
      editable: false,
      options: empresaDominio?.map(a => ({ value: a.empresa.nombre, label: a.empresa.nombre })) ?? []
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
          label: "SIMEM"
        },{
          value: "SIMEM-Terceros",
          label: "SIMEM-Terceros"
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
}
