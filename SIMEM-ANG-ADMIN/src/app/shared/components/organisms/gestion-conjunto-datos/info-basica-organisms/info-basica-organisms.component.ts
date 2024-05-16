import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownFormComponent } from '../../../atoms/dropdown-form/dropdown-form.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarFormComponent } from '../../../atoms/calendar-form/calendar-form.component';
import { BackButtonListComponent } from '../../../atoms/back-button-list/back-button-list.component';
import { ButtonModule } from 'primeng/button';
import {
  HasRecordParameter,
  PropertiesList,
  SaveDataSet,
  TypeView,
} from '../../../../../store/interfaces/common-interface';
import { InputTextModule } from 'primeng/inputtext';
import {
  BasicDataModel,
  CategoryTreeNode,
  HasRecordModel,
} from '../../../../../store/model/dataset/datasets.model';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { StyleClassModule } from 'primeng/styleclass';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatDialog } from '@angular/material/dialog';

import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';

import { LabelsModalComponent } from '../../../molecules/labels-modal/labels-modal.component';
import { ShowSelectxmModalComponent } from '../../../molecules/show-selectxm-modal/show-selectxm-modal.component';
import { TreeTableCategoryModalComponent } from '../../../molecules/tree-table-category-modal/tree-table-category-modal.component';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import _moment from 'moment';
const moment = _moment;
import { ButtonIconComponent } from '../../../atoms/button-icon/button-icon.component';

@Component({
  standalone: true,
  selector: 'simem-info-basica',
  templateUrl: './info-basica-organisms.component.html',
  styleUrl: './info-basica-organisms.component.scss',
  imports: [
    BackButtonListComponent,
    ButtonIconComponent,
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownFormComponent,
    InputTextareaModule,
    CalendarFormComponent,
    TreeModule,
    TreeTableModule,
    StyleClassModule,
    InputSwitchModule,
    TreeTableCategoryModalComponent,
    CardModule,
    ShowSelectxmModalComponent,
    LabelsModalComponent,
    ClipboardModule,
    InputMaskModule,
  ],
  providers: [MessageService],
})
export class InfoBasicaOrganismsComponent implements OnInit, OnChanges {
  @Output() changeView = new EventEmitter<TypeView>();
  @Output() saveData = new EventEmitter<SaveDataSet>();
  @Output() hasRecord = new EventEmitter<HasRecordParameter>();
  @Input() basicDataDataSet: BasicDataModel = {
    idConfiguracionGeneracionArchivos: '',
    tema: '',
    nombreArchivoDestino: '',
    datoObligatorio: false,
    indRegulatorio: false,
    selectXM: '',
    nbSynapse: '',
    idDuracionISO: '',
    valorDeltaInicial: '',
    valorDeltaFinal: '',
    ultimaFechaActualizado: '',
    idPeriodicidad: '',
    titulo: '',
    descripcion: '',
    privacidad: false,
    idCategoria: '',
    idTipoVista: '',
    idGranularidad: '',
    entidadOrigen: '',
    estado: false,
    idConfiguracionClasificacionRegulatoria: '',
    etiquetas: [],
    nombreCategoria: '',
  };

  @Input() isLoadedbasicDataDataSet: boolean = false;
  @Input() categories: CategoryTreeNode[] = [];
  @Input() durationISO: PropertiesList[] = [];
  @Input() granularity: PropertiesList[] = [];
  @Input() periodicity: PropertiesList[] = [];
  @Input() labels: PropertiesList[] = [];
  @Input() clasificationRegulatory: PropertiesList[] = [];
  @Input() typeView: PropertiesList[] = [];
  @Input() HasRecord!: HasRecordModel;

  formData: FormGroup = new FormGroup({});
  selectedCategory!: TreeNode;
  nameCategory: string = '';
  idCategory: string = '';
  labelsData: string = '';
  labelsId: string[] = [];
  labelsSelected: PropertiesList[] = [];
  showCopyQuery = false;
  sourceQuery: string = '';
  typeViewSelected: PropertiesList = {
    code: '',
    name: '',
    dataType: '',
    description: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private dialog: MatDialog,
    private clipboardApi: ClipboardService
  ) {}

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      idConfiguracionGeneracionArchivos: [''],
      nombreCategoria: [''],
      tema: [''],
      nombreArchivoDestino: [''],
      datoObligatorio: [''],
      indRegulatorio: [''],

      selectXM: [''],
      labelsData: [''],
      nbSynapse: ['', Validators.required],
      idDuracionISO: [''],
      valorDeltaInicial: [''],
      valorDeltaFinal: [''],

      ultimaFechaIndexado: [''],
      ultimaFechaActualizado: [''],
      idPeriodicidad: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      privacidad: [false],
      idCategoria: [''],
      idTipoVista: [''],
      idGranularidad: [''],
      entidadOrigen: ['', Validators.required],

      estado: [false],
      idConfiguracionClasificacionRegulatoria: [''],
    });
    this.formData.patchValue(this.basicDataDataSet);
    this.nameCategory = this.basicDataDataSet.nombreCategoria;
    this.idCategory = this.basicDataDataSet.idCategoria;
    this.labelsId = this.basicDataDataSet.etiquetas;
    this.sourceQuery = this.basicDataDataSet.selectXM;
    this.onGetTypeView(this.basicDataDataSet.idTipoVista);
    this.onGetLabels();
    this.handledIndRegulatorio({
      checked: this.basicDataDataSet.indRegulatorio,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['HasRecord']) {
      if (changes['HasRecord'].currentValue.activeDataset === 'inactive') {
        this.messageService.add({
          severity: 'warn',
          summary: 'Activar',
          detail:
            'No es posible activar el conjunto de datos, no existen datos cargados',
        });
        this.formData.get('estado')?.setValue(false);
      }
    }
  }

  onGetTypeView(idTypeView: string) {
    this.typeViewSelected = this.typeView.find(
      (typeView) => typeView.code === idTypeView
    )!;
    if (typeof this.typeViewSelected === 'undefined') {
      this.typeViewSelected = {
        code: '',
        name: '',
        dataType: '',
        description: '',
      };
    }
  }

  handledDropDownNewValue(itemChange: any) {
    if (typeof itemChange !== 'undefined' && itemChange !== null)
      this.formData.get(itemChange.name)?.setValue(itemChange.value);

    if (itemChange.name === 'tipoVista') {
      this.onGetTypeView(itemChange.value);
      if (this.typeViewSelected.name === 'Documentos') {
        let granularityNa: PropertiesList = this.granularity.find(
          (granularity) => granularity.name === 'NA'
        )!;
        this.formData.get('idGranularidad')?.setValue(granularityNa.code);
      } else {
        this.formData
          .get('idGranularidad')
          ?.setValue(this.basicDataDataSet.idGranularidad);
      }
    }
  }

  handledPickerNewDate(newDate: any) {
    if (typeof newDate !== 'undefined' && newDate !== null)
      this.formData.get(newDate.name)?.setValue(newDate.value);
  }

  handledIndRegulatorio(value: any) {
    if (value.checked) {
      this.formData
        .get('idConfiguracionClasificacionRegulatoria')
        ?.setValidators([Validators.required]);
    } else {
      this.removeControlValidator('idConfiguracionClasificacionRegulatoria');
      this.formData
        .get('idConfiguracionClasificacionRegulatoria')
        ?.setValue(null);
    }
  }

  handledChangeStatus(value: any) {
    if (value.checked) {
      this.hasRecord.emit({
        idConfigurationDataSet:
          this.basicDataDataSet.idConfiguracionGeneracionArchivos,
      });
    }
  }

  goBack() {
    this.changeView.emit();
  }

  onViewCategories() {
    const dialogRef = this.dialog.open(TreeTableCategoryModalComponent, {
      data: {
        treeTableCategory: this.categories,
        idCategorySelected: this.idCategory,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.result === true) {
        this.selectedCategory = result.category;
        this.formData
          .get('nombreCategoria')
          ?.setValue(result.category.data.title);
        this.idCategory = result.category.data.id;
      }
    });
  }

  onViewSelecXM() {
    const dialogRef = this.dialog.open(ShowSelectxmModalComponent, {
      data: {
        selectXM: this.formData.get('selectXM')?.value,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.result === true) {
        this.formData.get('selectXM')?.setValue(result.selectXM);
      }
    });
  }

  onViewLabels() {
    this.onGetLabels();
    const dialogRef = this.dialog.open(LabelsModalComponent, {
      data: {
        labels: this.labels,
        labelsSelected: this.labelsSelected,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.result === true) {
        const codes: string[] = result.labels.map((label: any) => label.code);
        this.labelsId = [];
        this.labelsId = codes;
        const names: string[] = result.labels.map((label: any) => label.name);
        this.onShowLabels(names);
      }
    });
  }

  save() {
    if (!this.onValidateDateBeginDelta()) return;

    let valueIdConfiguracionClasificacionRegulatoria: string =
      this.formData.get('idConfiguracionClasificacionRegulatoria')?.value;

    let valueIndRegulatorio = this.formData.get('indRegulatorio')?.value;

    let validConfiguracionClasificacionRegulatoria: boolean =
      valueIdConfiguracionClasificacionRegulatoria === null &&
      !valueIndRegulatorio
        ? true
        : false;

    let validIndRegulatorio: boolean =
      valueIdConfiguracionClasificacionRegulatoria !== null &&
      valueIndRegulatorio
        ? true
        : validConfiguracionClasificacionRegulatoria;

    if (this.formData.valid && validIndRegulatorio) {
      const formDataToSend: SaveDataSet = this.formData.value;
      formDataToSend.etiquetas = this.labelsId;
      formDataToSend.idCategoria = this.idCategory;

      this.saveData.emit(formDataToSend);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Actualización',
        detail:
          'No es posible guardar los datos, valide los  campos requeridos',
      });
    }
  }

  onGetLabels() {
    this.labelsSelected = this.labels.filter((label) =>
      this.labelsId.includes(label.code)
    );
    const names: string[] = this.labelsSelected.map(
      (label: PropertiesList) => label.name
    );
    this.onShowLabels(names);
  }

  onShowLabels(names: string[]) {
    let listName = '';
    names.forEach((name) => {
      listName = `${listName},${name}`;
    });
    if (listName.startsWith(',')) {
      listName = listName.slice(1);
    }
    this.formData.get('labelsData')?.setValue(listName);
  }

  copySourceQuery() {
    this.clipboardApi.copyFromContent(this.sourceQuery);
    this.showCopyQuery = true;
    setTimeout(() => {
      this.showCopyQuery = false;
    }, 2000);
  }

  removeControlValidator(nameControl: string) {
    this.formData.get(nameControl)?.clearValidators();
    this.formData.get(nameControl)?.updateValueAndValidity();
  }

  onValidateDateBeginDelta(): boolean {
    let valueInitialDelta: Date = new Date(
      this.formData.get('valorDeltaInicial')?.value
    );
    let valueFinalDelta: Date = new Date(
      this.formData.get('valorDeltaFinal')?.value
    );
    let isValidDate = false;
    isValidDate = moment(valueInitialDelta).isSameOrBefore(
      moment(valueFinalDelta)
    );

    if (!isValidDate) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Actualización',
        detail:
          'No es posible guardar los datos, Valor Delta Inicial, no puede ser mayor a Valor Delta final',
      });
    }
    return isValidDate;
  }
}
