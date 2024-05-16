import { Component } from "@angular/core";
import { ExtraccionesTemplate } from "../../shared/components/templates/extracciones-template/extracciones-template.component";

@Component({
  selector: 'extracciones-component',
  templateUrl: 'extracciones.component.html',
  standalone: true,
  imports: [
    ExtraccionesTemplate
  ]
})
export class ExtraccionesComponent{}
