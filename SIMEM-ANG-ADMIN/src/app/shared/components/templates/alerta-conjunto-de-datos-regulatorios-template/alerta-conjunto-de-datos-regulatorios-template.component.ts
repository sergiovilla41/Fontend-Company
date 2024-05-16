import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { BackButtonComponent } from "../../atoms/back-button/back-button.component";
import { TableModule } from 'primeng/table';
import { CommonModule, DatePipe } from "@angular/common";
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from "primeng/button";
import { RegulatoryDatasetsModel } from "../../../../store/model/regulatory-datasets.model";
import { DropdownModule } from "primeng/dropdown";
import { PaginatorModule } from "primeng/paginator";
import { CardModule } from "primeng/card";
import { CalendarModule } from "primeng/calendar";

@Component({
  selector: 'alerta-conjunto-de-datos-regulatorios-template',
  standalone: true,
  templateUrl: 'alerta-conjunto-de-datos-regulatorios-template.component.html',
  styleUrls: ['alerta-conjunto-de-datos-regulatorios-template.component.scss'],
  imports: [BackButtonComponent, TableModule, CalendarModule, CommonModule, ButtonModule, StyleClassModule, DropdownModule, PaginatorModule, CardModule ],
})
export class AlertaConjuntoDeDatosRegulatoriosTemplateComponent implements OnChanges
{
  @Input() regulatoryDatasets!: RegulatoryDatasetsModel[];
  selectedRegulatoryDatasets!: RegulatoryDatasetsModel;

  ngOnChanges(changes: SimpleChanges) {
    if ('regulatoryDatasets' in changes && !changes['regulatoryDatasets'].firstChange) {
      const copiedArray = [...this.regulatoryDatasets];
      this.regulatoryDatasets = copiedArray;
    }
  }
}