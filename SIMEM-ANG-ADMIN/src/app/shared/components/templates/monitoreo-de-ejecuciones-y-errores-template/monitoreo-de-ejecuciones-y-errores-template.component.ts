import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { BackButtonComponent } from "../../atoms/back-button/back-button.component";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { StyleClassModule } from "primeng/styleclass";
import { DropdownModule } from "primeng/dropdown";
import { PaginatorModule } from "primeng/paginator";
import { ExecutionMonitoringModel } from "../../../../store/model/execution-monitoring.model";
import { DetalleMonitoreoDeEjecucionModalComponent } from "../../molecules/detalle-monitoreo-de-ejecucion-modal/detalle-monitoreo-de-ejecucion-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmacionEjecucionModalComponent } from "../../molecules/confirmacion-ejecucion-modal/confirmacion-ejecucion-modal.component";
import { CardModule } from "primeng/card";
import { CalendarModule } from "primeng/calendar";

@Component({
  selector: 'monitoreo-de-ejecuciones-y-errores-template',
  standalone: true,
  templateUrl: 'monitoreo-de-ejecuciones-y-errores-template.component.html',
  styleUrls: ['monitoreo-de-ejecuciones-y-errores-template.component.scss'],
  imports: [
    BackButtonComponent, TableModule, CommonModule, ButtonModule, StyleClassModule, DropdownModule, PaginatorModule, CardModule, CalendarModule
  ]
})
export class MonitoreoDeEjecucionesYErroresTemplateComponent implements OnChanges
{
  @Input() executionMonitoring!: ExecutionMonitoringModel[];  

  selectedExecutionMonitoring!: ExecutionMonitoringModel;
  visible: boolean = false;

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('executionMonitoring' in changes && !changes['executionMonitoring'].firstChange) {
      const copiedArray = [...this.executionMonitoring];
      this.executionMonitoring = copiedArray;
    }
  }

  showDetailExecutionMonitoring(item : any) { 
    this.dialog.open(DetalleMonitoreoDeEjecucionModalComponent, {
       data: {
         detailExecutionMonitoring: item
       }
     });
  }

  showConfirmation(){
    this.dialog.open(ConfirmacionEjecucionModalComponent);    
  }
}
