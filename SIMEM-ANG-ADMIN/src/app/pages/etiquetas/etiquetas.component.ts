import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../../store/model/state.model";
import { clearLabelState, createLabel, getLabels, updateLabel } from "../../store/actions/labels.action";
import { EtiquetasTemplate } from "../../shared/components/templates/etiquetas/etiquetas.component";
import { CommonModule } from "@angular/common";
import { selectLabels } from "../../store/selectors/labels/labels.selector";
import { Label } from "../../store/model/labels.model";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

@Component({
  selector: "etiquetas-component",
  standalone: true,
  templateUrl: "etiquetas.component.html",
  styleUrl: "etiquetas.component.scss",
  imports: [
    EtiquetasTemplate,
    CommonModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class EtiquetasComponent implements OnInit{
  data = this.store.select(selectLabels)
  constructor(private store: Store<State>, private messageService: MessageService){}

  ngOnInit(): void {
    this.store.select((state: State) => state.labels.createdState).subscribe(updated => {
      if(updated){
        this.messageService.add({key: "labels", detail: "Etiqueta actualizada satisfactoriamente", summary: "Actualización", severity: "success"})
        this.store.dispatch(clearLabelState())
      }

    })
    this.store.select((state: State) => state.labels.updatedState).subscribe(updated => {
      if(updated){
        this.messageService.add({key: "labels", detail: "Etiqueta creada satisfactoriamente", summary: "Creación", severity: "success"})
        this.store.dispatch(clearLabelState())
      }
    })
  }

  fetchLabels(){
    this.store.dispatch(getLabels())
  }

  updateLabel(label: Label){
    this.store.dispatch(updateLabel({label}))
  }

  createLabel(label: Label){
    this.store.dispatch(createLabel({label}))
  }
}
