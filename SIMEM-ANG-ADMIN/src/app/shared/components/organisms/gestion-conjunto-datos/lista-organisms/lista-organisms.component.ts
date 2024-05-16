import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DataSetModel } from '../../../../../store/model/dataset/datasets.model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { ContextMenu } from 'primeng/contextmenu';
import { ClearFilterTableComponent } from '../../../atoms/clear-filter-table/clear-filter-table.component';
import { StyleClassModule } from 'primeng/styleclass';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { TypeView } from '../../../../../store/interfaces/common-interface';
import { DialogModule } from 'primeng/dialog';

@Component({
  standalone: true,
  selector: 'simem-lista-organisms',
  templateUrl: './lista-organisms.component.html',
  styleUrl: './lista-organisms.component.scss',
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
    DialogModule
  ],
})
export class ListaOrganismsComponent implements OnInit, OnChanges {
  @ViewChildren(Calendar) datePickers: QueryList<Calendar> | undefined;
  @ViewChild(ContextMenu) contextMenu: ContextMenu | undefined;
  @Output() changeView = new EventEmitter<TypeView>();
  @Output() executePipeline = new EventEmitter<string>();
  @Output() cancelPipeline = new EventEmitter<string>();
  @Input() dataSets!: DataSetModel[];
  dataSetslist: DataSetModel[] = [];
  nbSynapse?: string
  pipelineId?: string;

  idGenerationFile: string = '';

  items: MenuItem[] = [];

  visible: boolean = false;

  ngOnInit(): void {
    this.onCreateItemMenu();
  }

  onCreateItemMenu() {
    console.log(this.pipelineId);
    this.items = [
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-file-edit',
        command: () => this.onEditDataset(),
      },
      {
        label: 'Lanzar pipeline',
        visible: !this.pipelineId,
        icon: 'pi pi-fw pi-play',
        command: () => this.confirm(),
      },
      {
        label: 'Cancelar pipeline',
        visible: this.pipelineId != null,
        icon: 'pi pi-fw pi-stop',
        command: () => this.onCancelPipelineExecution(),
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('dataSets' in changes && !changes['dataSets'].firstChange) {
      const copiedArray = [...this.dataSets];
      this.dataSetslist = copiedArray;
    }
  }

  onEditDataset() {
    this.changeView.emit({
      view: 'EditDatasets',
      idFileGeneration: this.idGenerationFile,
    });
  }

  onCancelPipelineExecution() {
    this.cancelPipeline.emit(this.pipelineId);
    this.visible = false;
  }

  onLanzarPipeline() {
    this.executePipeline.emit(this.nbSynapse);
    this.visible = false;
  }

  confirm() {
    this.visible = true;
  }


  public onClickMenu(_idGenerationFile: string, nbSynapse: string) {
    if (typeof _idGenerationFile === 'undefined') return;
    this.idGenerationFile = _idGenerationFile;
    this.nbSynapse = nbSynapse
  }

  handleClearFilterPicker() {
    this.datePickers!.forEach((datePicker) => datePicker.clear());
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach((input: any) => {
      input.value = '';
    });
  }
}
