import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { ClearFilterTableComponent } from '../../../atoms/clear-filter-table/clear-filter-table.component';
import { StyleClassModule } from 'primeng/styleclass';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MessageService, SelectItem } from 'primeng/api';
import { PropertiesList } from '../../../../../store/interfaces/common-interface';
import { ToastModule } from 'primeng/toast';
import { ExtractionModel } from '../../../../../store/model/extractions/extraction.model';
import { DialogModule } from 'primeng/dialog';
import { DropdownFormComponent } from '../../../atoms/dropdown-form/dropdown-form.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  selector: 'simem-extraction',
  templateUrl: './extraction-organisms.component.html',
  styleUrl: './extraction-organisms.component.scss',
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
})
export class ExtractionOrganismsComponent implements OnChanges {
  @Output() updateExtractionInformation = new EventEmitter<ExtractionModel>();
  @Output() saveExtractionInformation = new EventEmitter<ExtractionModel>();
  @Output() deleteExtractionInformation = new EventEmitter<ExtractionModel>();

  @ViewChildren(Calendar) datePickers: QueryList<Calendar> | undefined;
  @ViewChild(Table, { read: Table }) pTable?: Table;

  @Input() extractionInformation!: ExtractionModel[];
  @Input() extractionDataState!: string | null;
  @Input() idConfiguracionGeneracionArchivos!: string | null;
  @Input() periodicity: PropertiesList[] = [];

  tema: string = '';
  nombreExtraccion: string = '';
  periodicityList: SelectItem[] = [];
  periodicityName: string = '';
  intevalList: SelectItem[] = [];
  interval: number | undefined;
  fechaDeltaInicial?: Date;
  fechaDeltaFinal?: Date;
  extractionlist: ExtractionModel[] = [];
  clonedExtractionList: { [s: number]: ExtractionModel } = {};
  isEdit: boolean = false;
  isNew: boolean = false;
  isWorking: boolean = false;
  displayDialog: boolean = false;
  rowToSave = {} as ExtractionModel;
  rowToDelete = {} as ExtractionModel;

  constructor(private messageService: MessageService) {}

  ngOnChanges() {
    this.extractionlist = this.extractionInformation;

    this.periodicityList = [
      ...this.periodicity.map((x) => ({ value: x.name, label: x.name })),
    ];

    this.intevalList = [
      { value: 0, label: '0' },
      { value: 1, label: '1' },
    ];

    setTimeout(() => {
      if (this.extractionDataState == 'OK' && this.isWorking) {
        this.ShowMessage(
          'success',
          'Información de extracciones actualizada',
          'Éxito'
        );
      }
      if (this.isWorking && this.extractionDataState == 'NOK') {
        this.ShowMessage(
          'error',
          'Ocurrio un error procesando la información',
          'Error'
        );
      }
      this.isWorking = false;
    }, 1000);
  }

  showDialog(data: ExtractionModel) {
    this.displayDialog = true;
    this.rowToDelete = data;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  onAddNewRow() {
    if (this.isEdit) return;

    this.isNew = true;

    const newData: ExtractionModel = {
      idConfiguracionGeneracionArchivos:
        this.idConfiguracionGeneracionArchivos!,
      idExtraccion: '0',
      tema: '',
      nombreExtraccion: '',
      fechaCreacion: new Date(),
      fechaDeltaInicial: new Date(),
      fechaDeltaFinal: new Date(),
    };
    this.extractionlist = [newData, ...this.extractionlist];
    this.pTable!.editingRowKeys = {
      [newData.idExtraccion]: true,
    };
    this.onRowEditInit(newData, 0);
  }

  onRowEditInit(data: ExtractionModel, index: number) {
    this.isEdit = true;
    this.tema = data.tema!;
    this.nombreExtraccion = data.nombreExtraccion;
    this.periodicityName = data.periodicidad!;
    this.interval = data.intervaloPeriodicidad;
    this.fechaDeltaInicial = new Date(data.fechaDeltaInicial!);
    this.fechaDeltaFinal = new Date(data.fechaDeltaFinal!);

    this.clonedExtractionList[index] = {
      ...data,
    };
  }

  onRowEditSave(data: ExtractionModel, index: number) {
    this.rowToSave = { ...data };
    this.rowToSave.tema = this.tema;
    this.rowToSave.nombreExtraccion = this.nombreExtraccion;
    this.rowToSave.periodicidad = this.periodicityName!;
    this.rowToSave.intervaloPeriodicidad = this.interval;
    this.rowToSave.fechaDeltaInicial = this.fechaDeltaInicial!;
    this.rowToSave.fechaDeltaFinal = this.fechaDeltaFinal!;

    if (!this.onValidateSave(this.rowToSave, index)) return;

    let clone = [...this.extractionInformation];
    clone[index] = this.rowToSave;
    this.extractionlist = clone;
    delete this.clonedExtractionList[index];
    if (this.isEdit && !this.isNew) {
      this.updateInfo(this.rowToSave);
    }
    if (this.isNew) {
      this.saveInfo(this.rowToSave);
    }
    this.isEdit = false;
    this.isNew = false;
    this.rowToSave = {} as ExtractionModel;
  }

  onValidateSave(data: ExtractionModel, index: number) {
    if (
      data.tema == '' ||
      data.nombreExtraccion == '' ||
      data.periodicidad == null ||
      data.intervaloPeriodicidad == null ||
      data.fechaDeltaInicial == null ||
      data.fechaDeltaFinal == null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Guardar información',
        detail:
          'No es posible guardar los datos, todos los campos deben estar diligenciados',
      });
      this.onRowEditCancel(index);
      return false;
    }

    const regex = /^[A-Za-z0-9_-]+$/;
    if (!(regex.test(data.tema!)) || !(regex.test(data.nombreExtraccion))) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Guardar información',
        detail:
          'No es posible guardar los datos, no se admiten caracteres especiales ni espacios',
      });
      this.onRowEditCancel(index);
      return false;
    }

    if (data.fechaDeltaInicial > data.fechaDeltaFinal){
      this.messageService.add({
        severity: 'warn',
        summary: 'Guardar información',
        detail:
          'No es posible guardar los datos, Delta inicial debe ser menor o igual a Delta final',
      });
      this.onRowEditCancel(index);
      return false;
    }

    return true;
  }

  onRowEditCancel(index: number) {
    if (this.isNew) {
      let clone = [...this.extractionlist];
      clone.splice(index, 1);
      this.extractionlist = clone;
      this.isNew = false;
    }
    delete this.clonedExtractionList[index];
    this.isEdit = false;
  }

  updateInfo(data: ExtractionModel) {
    let extraction: ExtractionModel = {
      ...data,
    };
    this.isWorking = true;
    this.updateExtractionInformation.emit(extraction);
  }

  saveInfo(data: ExtractionModel) {
    let extraction: ExtractionModel = {
      proyecto: 'SIMEM',
      ...data,
    };
    this.isWorking = true;
    this.saveExtractionInformation.emit(extraction);
  }

  deleteInfo() {
    this.hideDialog();
    let extraction: ExtractionModel = {
      idExtraccion: this.rowToDelete.idExtraccion,
      idConfiguracionGeneracionArchivos:
        this.rowToDelete.idConfiguracionGeneracionArchivos,
      proyecto: this.rowToDelete.proyecto,
      tema: this.rowToDelete.tema,
      nombreExtraccion: this.rowToDelete.nombreExtraccion,
      periodicidad: this.rowToDelete.periodicidad,
      intervaloPeriodicidad: this.rowToDelete.intervaloPeriodicidad,
      fechaDeltaInicial: this.rowToDelete.fechaDeltaInicial,
      fechaDeltaFinal: this.rowToDelete.fechaDeltaFinal,
      fechaCreacion: this.rowToDelete.fechaCreacion,
    };
    this.isWorking = true;
    this.deleteExtractionInformation.emit(extraction);
    this.rowToDelete = {} as ExtractionModel;
  }

  handleClearFilterPicker() {
    this.datePickers!.forEach((datePicker) => datePicker.clear());
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach((input: any) => {
      input.value = '';
    });
  }

  ShowMessage(type: string, error: string, title: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: error,
    });
  }
}
