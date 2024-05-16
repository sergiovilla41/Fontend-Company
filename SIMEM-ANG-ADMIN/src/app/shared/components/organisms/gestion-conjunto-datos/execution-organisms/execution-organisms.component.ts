import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';
import { ClearFilterTableComponent } from '../../../atoms/clear-filter-table/clear-filter-table.component';
import { StyleClassModule } from 'primeng/styleclass';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DropdownFormComponent } from '../../../atoms/dropdown-form/dropdown-form.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ExecutionData } from '../../../../../store/interfaces/executions/execution.interface';
import { CommomDropdown } from '../../../../helpers/common-dropdown';
import { ExecutionModel } from '../../../../../store/model/executions/execution.model';

@Component({
  standalone: true,
  selector: 'simem-execution',
  templateUrl: './execution-organisms.component.html',
  styleUrl: './execution-organisms.component.scss',
  imports: [
    CardModule,
    CalendarModule,
    ClearFilterTableComponent,
    CommonModule,
    TableModule,
    MenuModule,
    StyleClassModule,
    ButtonModule,
    DropdownModule,
    PaginatorModule,
    ToastModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    DropdownFormComponent,
  ],
  providers: [MessageService],
})
export class ExecutionOrganismsComponent implements OnInit, OnChanges {
  @Output() updateExecutionInformation = new EventEmitter<ExecutionModel>();
  @Output() saveExecutionInformation = new EventEmitter<ExecutionModel>();
  @Output() deleteExecutionInformation = new EventEmitter<ExecutionModel>();

  @Input() data: ExecutionData[] = [];
  clonedData: ExecutionData[] = [];
  @Input() executionDataState!: string | null;
  @Input() idConfiguracionGeneracionArchivos!: string;

  @ViewChild(Table, { read: Table }) pTable?: Table;

  isEdit: boolean = false;
  isNew: boolean = false;
  rowIndex: number = 0;
  clonedExecutionList: { [s: number]: ExecutionData } = {};
  lstDay!: SelectItem[];
  lstMonth!: SelectItem[];
  lstHour!: SelectItem[];
  lstWeekDay!: SelectItem[];
  lstWorkDayInd!: SelectItem[];
  lstActiveInd!: SelectItem[];
  isWorking: boolean = false;
  displayDialog: boolean = false;
  rowToDelete = {} as ExecutionData;

  constructor(
    private messageService: MessageService,
    private dropdown: CommomDropdown
  ) { }

  ngOnInit(): void {
    this.lstDay = this.dropdown.GetDays();
    this.lstMonth = this.dropdown.GetMonths();
    this.lstHour = this.dropdown.GetHours();
    this.lstWeekDay = this.dropdown.GetWeekDays();
    this.lstWorkDayInd = this.dropdown.GetYesNo();
    this.lstActiveInd = this.dropdown.GetYesNo();
  }

  ngOnChanges(): void {
    this.clonedData = this.data.map((a) => {
      return { ...a, mes: { ...a.mes }, dia: { ...a.dia }, hora: { ...a.hora }, diaSemana: { ...a.diaSemana }, indDiaHabil: { ...a.indDiaHabil }, indActivo: { ...a.indActivo } }
    });
    setTimeout(() => {
      if (this.executionDataState == 'OK' && this.isWorking) {
        this.ShowMessage(
          'success',
          'Información de ejecuciones actualizada',
          'Éxito'
        );
      }
      if (this.isWorking && this.executionDataState == 'NOK') {
        this.ShowMessage(
          'error',
          'Ocurrio un error procesando la información',
          'Error'
        );
      }
      this.isWorking = false;
    }, 1000);
  }

  showDialog(executionData: ExecutionData) {
    this.displayDialog = true;
    this.rowToDelete = executionData;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  onAddNewRow() {
    if (this.isEdit) return;

    this.isNew = true;

    const newData: ExecutionData = {
      idEjecucion: '0',
      idConfiguracionGeneracionArchivos: this.idConfiguracionGeneracionArchivos,
      dia: {
        value: null,
        label: (new CommomDropdown().GetDaysMap() as any)['0'],
      },
      mes: {
        value: null,
        label: (new CommomDropdown().GetMonthsMap() as any)['0'],
      },
      diaSemana: {
        value: null,
        label: (new CommomDropdown().GetWeekDaysMap() as any)['0'],
      },
      hora: {
        value: 0,
        label: (new CommomDropdown().GetHoursMap() as any)['0'],
      },
      indDiaHabil: {
        value: true,
        label: (new CommomDropdown().GetYesNoMap() as any)['0'],
      },
      indActivo: {
        value: true,
        label: (new CommomDropdown().GetYesNoMap() as any)['0'],
      },
      fechaCreacion: new Date(),
      fechaActualizacion: null,
    };
    this.clonedData = [newData, ...this.clonedData];
    if (this.pTable) {
      this.pTable.editingRowKeys = {
        [newData.idEjecucion]: true,
      };
    }

    this.onRowEditInit(newData);
  }

  onRowEditInit(executionData: ExecutionData) {
    this.isEdit = true;
    this.rowIndex = this.clonedData.findIndex(
      (data) => data.idEjecucion === executionData.idEjecucion
    );
    this.clonedExecutionList[this.rowIndex] = {
      ...executionData,
    };
  }

  onRowEditSave(executionData: ExecutionData) {
    executionData.indActivo.label =
      executionData.indActivo.value != null ? (new CommomDropdown().GetYesNoMap() as any)[executionData.indActivo.value.toString()] : 'false';
    executionData.indDiaHabil.label =
      executionData.indDiaHabil.value != null ? (new CommomDropdown().GetYesNoMap() as any)[executionData.indDiaHabil.value.toString()] : 'N/A';
    executionData.mes.label =
      executionData.mes.value != null ? (new CommomDropdown().GetMonthsMap() as any)[executionData.mes.value] : 'N/A';
    executionData.dia.label =
      executionData.dia.value != null ? (new CommomDropdown().GetDaysMap() as any)[executionData.dia.value] : 'N/A';
    executionData.hora.label =
      executionData.hora.value != null ? (new CommomDropdown().GetHoursMap() as any)[executionData.hora.value] : 'N/A';
    executionData.diaSemana.label =
      executionData.diaSemana.value != null ? (new CommomDropdown().GetWeekDaysMap() as any)[executionData.diaSemana.value] : 'N/A';

    if (!this.onValidateSave(executionData)) return;

    let clone = [...this.data];
    clone[this.rowIndex] = executionData;
    this.clonedData = clone;
    delete this.clonedExecutionList[this.rowIndex];
    if (this.isEdit && !this.isNew) {
      this.updateInfo(executionData);
    }
    if (this.isNew) {
      this.saveInfo(executionData);
    }
    this.isEdit = false;
    this.isNew = false;
  }

  onRowEditCancel() {
    if (this.isNew) {
      let clone = [...this.data];
      clone.splice(this.rowIndex, 1);
      this.clonedData = clone;
      this.isNew = false;
    }
    delete this.clonedExecutionList[this.rowIndex];
    this.isEdit = false;
    this.clonedData = this.data;
  }

  onValidateSave(data: ExecutionData) {
    if (data.indDiaHabil.value == null || data.indActivo.value == null || data.hora.value == null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Guardar información',
        detail:
          'No es posible guardar los datos, Indicativo día hábil, Indicativo activo y Hora son campos obligatorios',
      });
      this.onRowEditCancel();
      return false;
    }

    if (data.mes.value == null && data.dia.value == null && data.diaSemana.value == null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Guardar información',
        detail:
          'No es posible guardar los datos, debe ingresar valores correctos',
      });
      this.onRowEditCancel();
      return false;
    }

    return true;
  }

  saveInfo(executionData: ExecutionData) {
    let execution: ExecutionModel = {
      idEjecucion: executionData.idEjecucion,
      idConfiguracionGeneracionArchivos:
        executionData.idConfiguracionGeneracionArchivos,
      indActivo: executionData.indActivo.value ?? false,
      indDiaHabil: executionData.indDiaHabil.value!,
      mes: executionData.mes.value,
      dia: executionData.dia.value,
      diaSemana: executionData.diaSemana.value,
      fechaCreacion: new Date(),
      hora: executionData.hora.value!,
      fechaActualizacion: null,
    };
    this.isWorking = true;
    this.saveExecutionInformation.emit(execution);
  }

  updateInfo(executionData: ExecutionData) {
    let execution: ExecutionModel = {
      idEjecucion: executionData.idEjecucion,
      idConfiguracionGeneracionArchivos:
        executionData.idConfiguracionGeneracionArchivos,
      indActivo: executionData.indActivo.value ?? false,
      indDiaHabil: executionData.indDiaHabil.value!,
      mes: executionData.mes.value,
      dia: executionData.dia.value,
      diaSemana: executionData.diaSemana.value,
      fechaCreacion: executionData.fechaCreacion!,
      hora: executionData.hora.value!,
      fechaActualizacion: new Date(),
    };
    this.isWorking = true;
    this.updateExecutionInformation.emit(execution);
  }

  deleteInfo() {
    this.hideDialog();
    let execution: ExecutionModel = {
      idEjecucion: this.rowToDelete.idEjecucion,
      idConfiguracionGeneracionArchivos:
        this.rowToDelete.idConfiguracionGeneracionArchivos,
      indActivo: this.rowToDelete.indActivo.value!,
      indDiaHabil: this.rowToDelete.indDiaHabil.value!,
      mes: this.rowToDelete.mes.value,
      dia: this.rowToDelete.dia.value,
      diaSemana: this.rowToDelete.diaSemana.value,
      hora: this.rowToDelete.hora.value!,
      fechaCreacion: this.rowToDelete.fechaCreacion!,
      fechaActualizacion: null,
    };
    this.isWorking = true;
    this.deleteExecutionInformation.emit(execution);
    this.rowToDelete = {} as ExecutionData;
  }

  ShowMessage(type: string, error: string, title: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: error,
    });
  }
}
