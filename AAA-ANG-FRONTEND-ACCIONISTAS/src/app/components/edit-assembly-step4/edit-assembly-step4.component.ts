import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'edit-assembly-step4',
  templateUrl: 'edit-assembly-step4.component.html',
  styleUrls: ['edit-assembly-step4.component.scss']
})

export class EditAssemblyStep4Component implements OnInit {
  tipoAsambleas = ['Asamblea extraordinaria', 'Asamblea ordinarias']
  votacionResults = [{
    ID: '1128',
    tipo: 'B',
    accionista: 'David Ruiz Ospina',
    asistente: 'David Ruiz Ospina',
    porcentajeParticipacion: '0,0000012%',
    acciones: 235
  }]
  constructor() { }

  ngOnInit() { }
}
