import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SourceColumnsModel } from '../../../../../store/model/dataset/datasets.model';
import { SourceColumnsSave } from '../../../../../store/interfaces/datasets-source-columns.interface';
import {
  ItemNewValue,
  PropertiesList,
} from '../../../../../store/interfaces/common-interface';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownFormComponent } from '../../../atoms/dropdown-form/dropdown-form.component';
import { ClearFilterTableComponent } from '../../../atoms/clear-filter-table/clear-filter-table.component';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';

@Component({
  standalone: true,
  selector: 'simem-columnas-origen',
  templateUrl: './columnas-origen-organisms.component.html',
  styleUrl: './columnas-origen-organisms.component.scss',
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    TableModule,
    DropdownFormComponent,
    ClearFilterTableComponent,
    ToastModule,
    MessagesModule,
    DropdownFormComponent,
  ],
  providers: [MessageService],
})
export class ColumnasOrigenOrganismsComponent implements OnChanges {
  @Input() sourceColumns: SourceColumnsModel[] = [];
  @Input() purposeColumn: PropertiesList[] = [];
  @Input() versionColumn: PropertiesList[] = [];
  @Input() targetColumn: PropertiesList[] = [];
  @Input() isLoadedTargetColumn = false;
  @Input() isLoadedPurposeColumn = false;
  @Output() saveSourceColumns = new EventEmitter<SourceColumnsSave>();
  @Output() saveSourceColumnsVersionPurpose =
    new EventEmitter<SourceColumnsSave>();

  idSourceColumn: string = '';
  rowIndex: number = 0;
  originColumn: string = '';
  idTargetColumn: string = '';
  idColumVersion: string | null = '';
  idColumPurpose: string | null = '';
  esEdit = false;

  sourceColumnsData: SourceColumnsModel[] = [];
  sourceColumnsDataClone: SourceColumnsModel[] = [];

  constructor(private messageService: MessageService) {}

  ngOnChanges() {
    this.sourceColumnsData = this.sourceColumns.map((source) => {
      return source;
    });
    this.idColumVersion = this.sourceColumns[0]?.idExtractionVersionColumn;
    this.idColumPurpose = this.sourceColumns[0]?.idExtractionTargetColumn;
  }

  onRowEditInit(_idSourceColumn: string) {
    this.esEdit = true;
    this.idSourceColumn = _idSourceColumn;
    this.rowIndex = this.sourceColumnsData.findIndex(
      (data) => data.idSourceColumn === this.idSourceColumn
    );
    this.originColumn = this.sourceColumnsData[this.rowIndex].originColumn;
    this.idTargetColumn =
      this.sourceColumnsData[this.rowIndex].idTargetColumn.toString();

    this.sourceColumnsDataClone = this.sourceColumnsData.map((source) => {
      return source;
    });
  }

  onValidateSave() {
    if (
      this.sourceColumnsData[this.rowIndex]?.originColumn == null ||
      this.sourceColumnsData[this.rowIndex]?.originColumn?.length === 0
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Actualización',
        detail:
          'No es posible guardar los datos, no ingreso un dato en columna origen',
      });
      this.onRowEditCancel();
      return false;
    }
    return true;
  }

  onRowEditSave() {
    let sourceColumnEdit = { ...this.sourceColumnsData[this.rowIndex] };
    sourceColumnEdit.originColumn = this.originColumn?.replace(/\s/g, '');
    this.sourceColumnsData[this.rowIndex] = sourceColumnEdit;
    if (!this.onValidateSave()) return;

    let sourceColumns: SourceColumnsSave = {
      idColumnaOrigen: this.sourceColumnsData[this.rowIndex].idSourceColumn,
      numeracion: this.sourceColumnsData[this.rowIndex].numeration,
      columnaOrigen: this.sourceColumnsData[this.rowIndex].originColumn,
      idColumnaDestino: this.sourceColumnsData[this.rowIndex].idTargetColumn,
      tipoDato: this.sourceColumnsData[this.rowIndex].dataType,
      descripcion: null,
      idExtraccion: this.sourceColumnsData[this.rowIndex].idExtraction,
      extraccionIdColumnaDestino:
        this.sourceColumnsData[this.rowIndex].idExtractionTargetColumn,
      extraccionColumnaVersion:
        this.sourceColumnsData[this.rowIndex].idExtractionVersionColumn,
    };
    this.saveSourceColumns.emit(sourceColumns);
    this.esEdit = false;
  }

  onRowEditCancel() {
    this.sourceColumnsData = this.sourceColumnsDataClone.map((source) => {
      return source;
    });

    this.idSourceColumn = '';
    this.rowIndex = 0;
    this.originColumn = '';
    this.idTargetColumn = '';
    this.idColumVersion = '';
    this.idColumPurpose = '';
    this.esEdit = false;
  }

  handledDropDownNewValue(itemChange: ItemNewValue) {
    if (typeof itemChange !== 'undefined' && itemChange !== null) {
      switch (itemChange.name) {
        case 'sctargetColumn':
          this.changeTargetColumn(itemChange);
          break;
        case 'csExidColumnaDestino':
          this.idColumPurpose = itemChange.value;
          break;
        case 'csExidColumnaVersion':
          this.idColumVersion = itemChange.value;
          break;
        default:
          break;
      }
    }
  }

  changeTargetColumn(itemChange: ItemNewValue) {
    const newTargeColumn = this.targetColumn.filter(
      (data) => data.code === itemChange.value
    )[0];
    const sourceColumnEdit = { ...this.sourceColumnsData[this.rowIndex] };
    this.idTargetColumn = newTargeColumn.code;

    sourceColumnEdit.idTargetColumn = newTargeColumn.code;
    sourceColumnEdit.targetColumn = newTargeColumn.name;
    sourceColumnEdit.dataType = newTargeColumn.dataType;
    sourceColumnEdit.description = newTargeColumn.description;

    this.sourceColumnsData[this.rowIndex] = sourceColumnEdit;
  }

  saveColumnTargetVersion() {
    let sourceColumnEdit = { ...this.sourceColumnsData[0] };

    sourceColumnEdit.idExtractionTargetColumn = this.idColumPurpose!;
    sourceColumnEdit.idExtractionVersionColumn = this.idColumVersion!;
    this.sourceColumnsData[0] = sourceColumnEdit;

    let sourceColumns: SourceColumnsSave = {
      idColumnaOrigen: this.sourceColumnsData[0].idSourceColumn,
      numeracion: this.sourceColumnsData[0].numeration,
      columnaOrigen: this.sourceColumnsData[0].originColumn,
      idColumnaDestino: this.sourceColumnsData[0].idTargetColumn,
      tipoDato: this.sourceColumnsData[0].dataType,
      descripcion: null,
      idExtraccion: this.sourceColumnsData[0].idExtraction,
      extraccionIdColumnaDestino:
        this.sourceColumnsData[0].idExtractionTargetColumn,
      extraccionColumnaVersion:
        this.sourceColumnsData[0].idExtractionVersionColumn,
    };
    this.saveSourceColumnsVersionPurpose.emit(sourceColumns);
  }
}
