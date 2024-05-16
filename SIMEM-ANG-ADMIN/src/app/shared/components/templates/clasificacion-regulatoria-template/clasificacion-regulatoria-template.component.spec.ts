import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasificacionRegulatoriaTemplateComponent } from './clasificacion-regulatoria-template.component';
import { RegulatoryClassificationData } from '../../../../store/interfaces/regulatory-classification.interface';
import { RegulatoryClassificationModel } from '../../../../store/model/regulatory-classification.model';
import { MessageService } from 'primeng/api';

const regulatoryClassificatio: RegulatoryClassificationData = {
  idConfiguracionClasificacionRegulatoria: "00000000-0000-0000-0000-000000000000",
  codigoDelta: null,
  descripcion: null,
  fechaCreacion: new Date(),
  deltaFinalAno: null,
  deltaFinalDiaMes: null,
  deltaInicialDiaSemana: {
    value: null,
    label: 'N/A'
  },
  deltaInicialMes: {
    value: null,
    label: 'N/A',
  },
  deltaInicialPeriodo: {
    value: null,
    label: 'N/A',
  },
  deltaFinalDiaSemana: {
    value: null,
    label: 'N/A',
  },
  deltaFinalMes: {
    value: null,
    label: 'N/A',
  },
  deltaFinalPeriodo: {
    value: null,
    label: 'N/A',
  },
  deltaFinalDias: null,
  deltaFinalMeses: null,
  deltaFinalSemanas: null,
  deltaInicialAno: null,
  deltaInicialDiaMes: null,
  deltaInicialDias: null,
  deltaInicialMeses: null,
  deltaInicialSemanas: null
};

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

describe('ClasificacionRegulatoriaTemplateComponent', () => {
  let component: ClasificacionRegulatoriaTemplateComponent;
  let fixture: ComponentFixture<ClasificacionRegulatoriaTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasificacionRegulatoriaTemplateComponent],
      providers: [
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasificacionRegulatoriaTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.editLabel(regulatoryClassificatioData)
    component.fetch()
  });

  it('#ngOnInit() should be called', () => {
    component.createLabel(regulatoryClassificatioData)
  });
});
