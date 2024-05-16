import { Component, OnInit } from '@angular/core';
import { selectRegulatoryClassificationItems, selectRegulatoryClassificationStatusSave } from '../../../store/selectors/regulatory-classification/regulatory-classification.selector';
import { Store } from "@ngrx/store";
import { State } from "../../../store/model/state.model";
import { addRegulatoryClassificationItems, beforeSavingClasification, getRegulatoryClassificationItems, updateRegulatoryClassificationItems } from '../../../store/actions/regulatory-classification.action';
import { ClasificacionRegulatoriaTemplateComponent } from '../../../shared/components/templates/clasificacion-regulatoria-template/clasificacion-regulatoria-template.component';
import { CommonModule } from '@angular/common';
import { RegulatoryClassificationModel } from '../../../store/model/regulatory-classification.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'clasificacion-regulatoria',
  templateUrl: './clasificacion-regulatoria.component.html',
  styleUrl: './clasificacion-regulatoria.component.scss',
  standalone: true,
  imports: [
    ClasificacionRegulatoriaTemplateComponent,
    CommonModule,
    ToastModule
  ],
  providers: [MessageService]  
})
export class ClasificacionRegulatoriaComponent implements OnInit{
  dataRegulatoryClassification$ = this.store.select(selectRegulatoryClassificationItems);
  regulatoryClassificationStatusSave$ = this.store.select(selectRegulatoryClassificationStatusSave);

  constructor(private store: Store<State>, private messageService: MessageService){}

  ngOnInit() {
    

    this.regulatoryClassificationStatusSave$.subscribe((statuss) => {
      if (statuss === 'save') {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualización',
          detail: 'Se ha actualizado la clasificación regulatoria satisfactoriamente',
        });        

      }
      if (statuss === 'error') {
        this.messageService.add({
          severity: 'error',
          summary: 'Actualización',
          detail: 'Se ha generado un error actualizando la clasificación regulatoria',
        });
      }
    });
  }

  
  addRegulatoryClassification(data: RegulatoryClassificationModel) {
    this.store.dispatch(beforeSavingClasification());
    this.store.dispatch(
      addRegulatoryClassificationItems({ dataRegulatoryClassification: data })
    );
  }

  updateRegulatoryClassification(data: RegulatoryClassificationModel) {
    this.store.dispatch(beforeSavingClasification());
    this.store.dispatch(
      updateRegulatoryClassificationItems({ dataRegulatoryClassification: data })
    );
  }

  fetch(){
    this.store.dispatch(getRegulatoryClassificationItems());
  }
}