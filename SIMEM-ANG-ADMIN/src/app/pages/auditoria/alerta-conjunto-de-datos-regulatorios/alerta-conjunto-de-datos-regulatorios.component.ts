import { Component, OnInit } from "@angular/core";
import { AlertaConjuntoDeDatosRegulatoriosTemplateComponent } from "../../../shared/components/templates/alerta-conjunto-de-datos-regulatorios-template/alerta-conjunto-de-datos-regulatorios-template.component";
import { Store } from "@ngrx/store";
import { State } from "../../../store/model/state.model";
import { getRegulatoryDatasetsItems } from "../../../store/actions/regulatory-datasets.action";
import { selectRegulatoryDatasetsItems } from "../../../store/selectors/regulatory-datasets/regulatory-datasets.selector";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'alerta-conjunto-de-datos-regulatorios',
  standalone: true,
  templateUrl: 'alerta-conjunto-de-datos-regulatorios.component.html',
  styleUrls: ['alerta-conjunto-de-datos-regulatorios.component.scss'],
  imports: [
    AlertaConjuntoDeDatosRegulatoriosTemplateComponent,
    CommonModule
  ]
})
export class AlertaConjuntoDeDatosRegulatoriosComponent implements OnInit{
  regulatoryDatasets = this.store.select(selectRegulatoryDatasetsItems);

  constructor(private store: Store<State>){}

  ngOnInit() {
    this.store.dispatch(getRegulatoryDatasetsItems())
  }
  
}
