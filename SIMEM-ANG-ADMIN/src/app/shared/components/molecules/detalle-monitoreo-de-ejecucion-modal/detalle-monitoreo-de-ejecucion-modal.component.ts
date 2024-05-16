import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { CommomDropdown } from '../../../helpers/common-dropdown';
import { ExecutionModel } from '../../../../store/model/execution.model';

@Component({
  selector: 'detalle-monitoreo-de-ejecucion-modal',
  templateUrl: 'detalle-monitoreo-de-ejecucion-modal.component.html',
  styleUrls: ['detalle-monitoreo-de-ejecucion-modal.component.scss'],
  imports: [TableModule, CommonModule, ButtonModule, StyleClassModule],
  standalone: true,
})
export class DetalleMonitoreoDeEjecucionModalComponent implements OnInit {
  detail: any;
  ejecuciones: ExecutionModel[] = [];
  constructor(
    private dropdown: CommomDropdown,
    public dialogRef: MatDialogRef<DetalleMonitoreoDeEjecucionModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      detailExecutionMonitoring: any;
    }
  ) {}

  ngOnInit(): void {
    this.detail = this.data.detailExecutionMonitoring;
    this.ejecuciones = this.detail.Ejecuciones.map((a: any) => ({
      diaSemana: this.dropdown.GetWeekDays().find(opcion => opcion.value === a.diaSemana)?.label,
      hora: a.hora,
      dia: a.dia,
      mes: a.mes,
      indDiaHabil: a.indDiaHabil,
      indActivo: a.indActivo
    }));
  }

  close(): void {
    this.dialogRef.close();
  }
}
