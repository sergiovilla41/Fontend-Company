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
import { CommomDropdown } from '../../../../helpers/common-dropdown';
import { PublicationModel } from '../../../../../store/model/publications/publication.model';
import { PublicationData } from '../../../../../store/interfaces/publications/publication.interface';

@Component({
  standalone: true,
  selector: 'simem-publication',
  templateUrl: './publication-organisms.component.html',
  styleUrl: './publication-organisms.component.scss',
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
export class PublicationOrganismsComponent implements OnInit, OnChanges {
  @Output() updatePublicationInformation = new EventEmitter<PublicationModel>();
  @Output() savePublicationInformation = new EventEmitter<PublicationModel>();
  @Output() deletePublicationInformation = new EventEmitter<PublicationModel>();

  @Input() data: PublicationData[] = [];
  clonedData: PublicationData[] = [];
  @Input() publicationDataState!: string | null;
  @Input() idConfiguracionGeneracionArchivos!: string;

  @ViewChild(Table, { read: Table }) pTable?: Table;

  isEdit: boolean = false;
  isNew: boolean = false;
  rowIndex: number = 0;
  clonedPublicationList: { [s: number]: PublicationData } = {};
  lstDay!: SelectItem[];
  lstMonth!: SelectItem[];
  lstWeekDay!: SelectItem[];
  lstWorkDayInd!: SelectItem[];
  isWorking: boolean = false;
  displayDialog: boolean = false;
  rowToDelete = {} as PublicationData;

  constructor(
    private messageService: MessageService,
    private dropdown: CommomDropdown
  ) {}

  ngOnInit(): void {
    this.lstDay = this.dropdown.GetDays();
    this.lstMonth = this.dropdown.GetMonths();
    this.lstWeekDay = this.dropdown.GetWeekDays();
    this.lstWorkDayInd = this.dropdown.GetYesNo();
  }

  ngOnChanges(): void {
    this.clonedData = this.data.map((a) => {
      return {...a, mes: {...a.mes}, dia: {...a.dia}, diaSemana: {...a.diaSemana}, indDiaHabil: {...a.indDiaHabil}}
    });
    
    setTimeout(() => {
      if (this.publicationDataState == 'OK' && this.isWorking) {
        this.ShowMessage(
          'success',
          'Información de publicaciones actualizada',
          'Éxito'
        );
      }
      if (this.isWorking && this.publicationDataState == 'NOK') {
        this.ShowMessage(
          'error',
          'Ocurrio un error procesando la información',
          'Error'
        );
      }
      this.isWorking = false;
    }, 1000);
  }

  showDialog(publicationData: PublicationData) {
    this.displayDialog = true;
    this.rowToDelete = publicationData;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  onAddNewRow() {
    if (this.isEdit) return;

    this.isNew = true;

    const newData: PublicationData = {
      idPublicacionRegulatoria: '0',
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
      indDiaHabil: {
        value: true,
        label: (new CommomDropdown().GetYesNoMap() as any)['0'],
      },
      fechaCreacion: new Date(),
    };
    this.clonedData = [newData, ...this.clonedData];
    this.pTable!.editingRowKeys = {
      [newData.idPublicacionRegulatoria]: true,
    };
    this.onRowEditInit(newData);
  }

  onRowEditInit(publicationData: PublicationData) {
    this.isEdit = true;
    this.rowIndex = this.clonedData.findIndex(
      (data) => data.idPublicacionRegulatoria === publicationData.idPublicacionRegulatoria
    );
    this.clonedPublicationList[this.rowIndex] = {
      ...publicationData,
    };
  }

  onRowEditSave(publicationData: PublicationData) {
    publicationData.indDiaHabil.label =
      publicationData.indDiaHabil.value != null ? (new CommomDropdown().GetYesNoMap() as any)[publicationData.indDiaHabil.value.toString()] : 'N/A';
    publicationData.dia.label =
      publicationData.dia.value != null ? (new CommomDropdown().GetDaysMap() as any)[publicationData.dia.value] : 'N/A';
    publicationData.mes.label =
      publicationData.mes.value != null ? (new CommomDropdown().GetMonthsMap() as any)[publicationData.mes.value] : 'N/A';
    publicationData.diaSemana.label =
      publicationData.diaSemana.value != null ? (new CommomDropdown().GetWeekDaysMap() as any)[publicationData.diaSemana.value] : 'N/A';

    if (!this.onValidateSave(publicationData)) return;

    let clone = [...this.data];
    clone[this.rowIndex] = publicationData;
    this.clonedData = clone;
    delete this.clonedPublicationList[this.rowIndex];
    if (this.isEdit && !this.isNew) {
      this.updateInfo(publicationData);
    }
    if (this.isNew) {
      this.saveInfo(publicationData);
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
    delete this.clonedPublicationList[this.rowIndex];
    this.isEdit = false;
    this.clonedData = [...this.data];
  }

  onValidateSave(data: PublicationData) {
    if (
      data.mes.value == null &&
      data.dia.value == null &&
      data.diaSemana.value == null
    ) {
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

  saveInfo(publicationData: PublicationData) {
    let publication: PublicationModel = {
      idPublicacionRegulatoria: publicationData.idPublicacionRegulatoria,
      idConfiguracionGeneracionArchivos: publicationData.idConfiguracionGeneracionArchivos,
      indDiaHabil: publicationData.indDiaHabil.value!,
      mes: publicationData.mes.value,
      dia: publicationData.dia.value,
      diaSemana: publicationData.diaSemana.value,
      fechaCreacion: new Date(),
    };
    this.isWorking = true;
    this.savePublicationInformation.emit(publication);
  }

  updateInfo(publicationData: PublicationData) {
    let publication: PublicationModel = {
      idPublicacionRegulatoria: publicationData.idPublicacionRegulatoria,
      idConfiguracionGeneracionArchivos: publicationData.idConfiguracionGeneracionArchivos,
      indDiaHabil: publicationData.indDiaHabil.value!,
      mes: publicationData.mes.value,
      dia: publicationData.dia.value,
      diaSemana: publicationData.diaSemana.value,
      fechaCreacion: publicationData.fechaCreacion!,
    };
    this.isWorking = true;
    this.updatePublicationInformation.emit(publication);
  }

  deleteInfo() {
    this.hideDialog();
    let publication: PublicationModel = {
      idPublicacionRegulatoria: this.rowToDelete.idPublicacionRegulatoria,
      idConfiguracionGeneracionArchivos: this.rowToDelete.idConfiguracionGeneracionArchivos,
      indDiaHabil: this.rowToDelete.indDiaHabil.value!,
      mes: this.rowToDelete.mes.value,
      dia: this.rowToDelete.dia.value,
      diaSemana: this.rowToDelete.diaSemana.value,
      fechaCreacion: this.rowToDelete.fechaCreacion!,
    };
    this.isWorking = true;
    this.deletePublicationInformation.emit(publication);
    this.rowToDelete = {} as PublicationData;
  }

  ShowMessage(type: string, error: string, title: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: error,
    });
  }
}
