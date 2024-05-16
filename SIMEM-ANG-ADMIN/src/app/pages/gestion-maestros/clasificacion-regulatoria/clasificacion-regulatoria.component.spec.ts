import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionRegulatoriaComponent } from './clasificacion-regulatoria.component';
import { CommonModule } from '@angular/common';
import { ClasificacionRegulatoriaTemplateComponent } from '../../../shared/components/templates/clasificacion-regulatoria-template/clasificacion-regulatoria-template.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { initialState } from '../../../shared/mocks/store.mock';
import { provideMockStore } from '@ngrx/store/testing';
import { RegulatoryClassificationModel } from '../../../store/model/regulatory-classification.model';
import { Observable } from 'rxjs';

const regulatoryClassificatioData: RegulatoryClassificationModel = {
  idConfiguracionClasificacionRegulatoria: "00000000-0000-0000-0000-000000000000",
  codigoDelta: null,
  descripcion: null,
  fechaCreacion: new Date(),
  deltaFinalAno: null,
  deltaFinalDiaMes: null,
  deltaInicialDiaSemana: null,
  deltaInicialMes: null,
  deltaInicialPeriodo: null,
  deltaFinalDiaSemana: null,
  deltaFinalMes: null,
  deltaFinalPeriodo: null,
  deltaFinalDias: null,
  deltaFinalMeses: null,
  deltaFinalSemanas: null,
  deltaInicialAno: null,
  deltaInicialDiaMes: null,
  deltaInicialDias: null,
  deltaInicialMeses: null,
  deltaInicialSemanas: null
};

describe('ClasificacionRegulatoriaComponent', () => {
  let component: ClasificacionRegulatoriaComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ClasificacionRegulatoriaTemplateComponent,
        ToastModule,
        MessagesModule,
      ],
      providers: [
        ClasificacionRegulatoriaComponent,
        provideMockStore({ initialState }),
        MessageService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = TestBed.inject(ClasificacionRegulatoriaComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should be called', () => {
    component.regulatoryClassificationStatusSave$ = new Observable( a => a.next("save"))
    component.ngOnInit();
  });

  it('#addRegulatoryClassification() change to listExtraction', () => {
    component.addRegulatoryClassification(regulatoryClassificatioData);
  });

  it('#updateRegulatoryClassification() change to admin', () => {
    component.updateRegulatoryClassification(regulatoryClassificatioData);
  });
});
