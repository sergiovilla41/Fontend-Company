import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractionOrganismsComponent } from './extraction-organisms.component';
import { MessageService } from 'primeng/api';

describe('ExtractionOrganismsComponent', () => {
  let component: ExtractionOrganismsComponent;
  let fixture: ComponentFixture<ExtractionOrganismsComponent>;

  const mock = {
    idExtraccion: 'string',
    idConfiguracionGeneracionArchivos: 'string',
    proyecto: 'string',
    tema: 'string',
    nombreExtraccion: 'string',
    periodicidad: 'string',
    intervaloPeriodicidad: 0,
    fechaDeltaInicial: new Date(),
    fechaDeltaFinal: new Date(),
    fechaCreacion: new Date(),
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [ExtractionOrganismsComponent, MessageService],
    });

    fixture = TestBed.createComponent(ExtractionOrganismsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.tema = 'temaPrueba';
    component.extractionInformation = [];
    component.nombreExtraccion = 'nombreExtraccionPrueba';
    component.periodicityList = [{ value: 'prueba', label: 'prueba' } as any];
    component.periodicityName = 'Anual';
    component.intevalList = [{ value: 0, label: '0' } as any];
    component.interval = 0;
    component.fechaDeltaInicial = new Date();
    component.fechaDeltaFinal = new Date();
    component.ngOnChanges();
    component.onRowEditInit(mock, 0);
    component.onRowEditCancel(0);
    component.onValidateSave(mock, 0);
    component.onRowEditSave(mock, 0);
    component.showDialog(mock);
    component.hideDialog();
    component.ShowMessage('success', 'mensaje prueba', 'Éxito');
  });
});
