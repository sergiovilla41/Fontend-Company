import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GestionConjuntosDatosComponent } from './pages/gestion-conjuntos-datos/gestion-conjuntos-datos.component';
import { MonitoreoDeEjecucionesYErroresComponent } from './pages/auditoria/monitoreo-de-ejecuciones-y-errores/monitoreo-de-ejecuciones-y-errores.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { AlertaConjuntoDeDatosRegulatoriosComponent } from './pages/auditoria/alerta-conjunto-de-datos-regulatorios/alerta-conjunto-de-datos-regulatorios.component';
import { LoginComponent } from './pages/auth/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MsalGuard } from '@azure/msal-angular';
import { EtiquetasComponent } from './pages/etiquetas/etiquetas.component';
import { ClasificacionRegulatoriaComponent } from './pages/gestion-maestros/clasificacion-regulatoria/clasificacion-regulatoria.component';
import { ExtraccionesComponent } from './pages/extracciones/extracciones.component';
import { DestinationColumnComponent } from './pages/destination-column/destination-column/destination-column.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'gestion-conjuntos-datos',
        component: GestionConjuntosDatosComponent
      },
      {
        path: 'gestion-maestros/clasificacion-regulatoria',
        component: ClasificacionRegulatoriaComponent
      },
      {
        path: 'gestion-maestros/etiquetas',
        component: EtiquetasComponent
      },
      {
        path: 'auditoria/monitoreo-ejecuciones',
        component: MonitoreoDeEjecucionesYErroresComponent
      },
      {
        path: 'auditoria/alerta-conjunto-de-datos-regulatorios',
        component: AlertaConjuntoDeDatosRegulatoriosComponent
      },
      {
        path: 'auditoria/gestion-usuario',
        component: GestionUsuariosComponent
      },
      {
        path: 'monitoreo-errores',
        component: MonitoreoDeEjecucionesYErroresComponent
      },
      {
        path: 'columna-destino',
        component: DestinationColumnComponent
      }

    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
