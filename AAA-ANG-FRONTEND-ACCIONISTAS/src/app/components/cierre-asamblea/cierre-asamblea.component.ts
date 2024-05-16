import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/model/state.model';
import { getDataCloseAssembly } from 'src/app/store/actions/asistencias.action';
import { AssemblyService } from 'src/app/services/assembly/assembly.service';
import { selectData } from 'src/app/store/selectors/asistencias/asistencia.selector';
import { selectEstadisticasVotacion } from 'src/app/store/selectors/votacion/votacion.selector';
import { getEstadisticasVotacion } from 'src/app/store/actions/votacion.action';

@Component({
  selector: 'cierre-asamblea',
  templateUrl: 'cierre-asamblea.component.html',
  styleUrls: ['cierre-asamblea.component.scss']
})

export class CierreAsambleaComponent implements OnInit {
  data$ = this.store.select(selectData)
  $estadisticasVotacion = this.store.select(selectEstadisticasVotacion)

  constructor(private store: Store<State>, private assemblyService: AssemblyService) { }

  ngOnInit() {
    this.assemblyService.getToEditAssembly().subscribe((assembly: any) => {
      
      this.store.dispatch(getDataCloseAssembly({ASAMBLEA_UUID: assembly.ID_REGISTRO}))
      this.store.dispatch(getEstadisticasVotacion({asambleaUUID: assembly.ID_REGISTRO}))

    });

  }
}
