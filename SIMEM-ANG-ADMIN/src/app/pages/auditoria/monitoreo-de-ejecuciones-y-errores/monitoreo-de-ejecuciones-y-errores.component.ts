import { Component, OnInit } from "@angular/core";
import { MonitoreoDeEjecucionesYErroresTemplateComponent } from "../../../shared/components/templates/monitoreo-de-ejecuciones-y-errores-template/monitoreo-de-ejecuciones-y-errores-template.component";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { State } from "../../../store/model/state.model";
import { selectExecutionMonitoringItems } from "../../../store/selectors/execution-monitoring/execution-monitoring.selector";
import { getExecutionMonitoringItems } from "../../../store/actions/execution-monitoring.action";

@Component({
  selector: 'monitoreo-de-ejecuciones-y-errores',
  standalone: true,
  templateUrl: 'monitoreo-de-ejecuciones-y-errores.component.html',
  styleUrls: ['monitoreo-de-ejecuciones-y-errores.component.scss'],
  imports: [
    MonitoreoDeEjecucionesYErroresTemplateComponent,
    CommonModule
  ]
})
export class MonitoreoDeEjecucionesYErroresComponent implements OnInit{
  executionMonitoring = this.store.select(selectExecutionMonitoringItems);

  constructor(private store: Store<State>){}

  ngOnInit() {
    this.store.dispatch(getExecutionMonitoringItems())
  }  
}
