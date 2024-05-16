import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ExecutionOrganismsComponent } from './execution-organisms.component';
import { MessageService } from 'primeng/api';
import { ExecutionModel } from '../../../../../store/model/executions/execution.model';
import { CommomDropdown } from '../../../../helpers/common-dropdown';
import { ExecutionData } from '../../../../../store/interfaces/executions/execution.interface';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const executionData: ExecutionData = {
  idEjecucion: '0',
  idConfiguracionGeneracionArchivos: '0',
  hora: {
    value: null,
    label: (new CommomDropdown().GetHoursMap() as any)['0'],
  },
  dia: {
    value: null
  },
  mes: {
    value: null,
    label: (new CommomDropdown().GetMonthsMap() as any)['0'],
  },
  diaSemana: {
    value: null,
    label: (new CommomDropdown().GetWeekDaysMap() as any)['0'],
  },
  indDiaHabil: {
    value: null,
    label: (new CommomDropdown().GetYesNoMap() as any)['0'],
  },
  indActivo: {
    value: null,
    label: (new CommomDropdown().GetYesNoMap() as any)['0'],
  },
  fechaCreacion: new Date(),
  fechaActualizacion: null,
};

const executionInformationData: ExecutionModel = {
  idEjecucion: '0',
  idConfiguracionGeneracionArchivos: '0',
  indDiaHabil: true,
  indActivo: true,
  dia: 0,
  mes: 0,
  diaSemana: null,
  fechaCreacion: new Date(),
  hora: 0,
  fechaActualizacion: null,
};

describe('ExecutionOrganismsComponent', () => {
  let component: ExecutionOrganismsComponent;
  let fixture: ComponentFixture<ExecutionOrganismsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ToastModule, MessagesModule],
      providers: [ExecutionOrganismsComponent, MessageService, CommomDropdown],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = TestBed.inject(ExecutionOrganismsComponent);
  });

  it("it", fakeAsync(() => {
    component.ngOnInit()
    component.data = [executionData]
    component.isWorking = true
    component.executionDataState = "OK"
    component.ngOnChanges()
    tick(1000)
    component.executionDataState = "NOK"
    component.ngOnChanges()
    tick(1000)
    component.showDialog(executionData)
    component.hideDialog()
    component.onAddNewRow()
    component.onRowEditInit(executionData)
    component.onRowEditSave(executionData)
    component.onRowEditCancel()
    component.onValidateSave(executionData)
    component.saveInfo(executionData)
    component.updateInfo(executionData)
    component.deleteInfo()
  }))
});
