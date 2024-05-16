import { Label } from "../model/labels.model"

export interface LabelResponse {
  id: string,
  titulo: string,
  estado: boolean
  generacionArchivos: { titulo: string }[]
}

export const LabelResponseToLabel = (lbl: LabelResponse): Label => ({
  id: lbl.id,
  estado: lbl.estado,
  generacionArchivos: lbl.generacionArchivos,
  titulo: lbl.titulo
})

