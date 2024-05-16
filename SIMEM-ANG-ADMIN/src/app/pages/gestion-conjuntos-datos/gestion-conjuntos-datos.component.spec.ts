import { TestBed } from '@angular/core/testing';
import { GestionConjuntosDatosComponent } from './gestion-conjuntos-datos.component';
import { initialState } from '../../shared/mocks/store.mock';
import { provideMockStore } from '@ngrx/store/testing';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import {
  columnsSaveMock,
  saveDatasetMock,
} from '../../shared/mocks/datasets.mock';

describe('GestionConjuntosDatosComponent', () => {
  let component: GestionConjuntosDatosComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GestionConjuntosDatosComponent,
        provideMockStore({ initialState }),
        MessageService,
      ],
    });
    component = TestBed.inject(GestionConjuntosDatosComponent);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should be called', () => {
    component.statusSave$ = new Observable((a) => a.next('save'));
    component.basicDataDataSet$ = new Observable((a) =>
      a.next({
        idConfiguracionGeneracionArchivos: '',
        tema: '',
        nombreArchivoDestino: '',
        datoObligatorio: false,
        indRegulatorio: false,
        selectXM: '',
        nbSynapse: '',
        idDuracionISO: '',
        valorDeltaInicial: '',
        valorDeltaFinal: '',
        ultimaFechaActualizado: '',
        idPeriodicidad: '',
        titulo: '',
        descripcion: '',
        privacidad: false,
        idCategoria: '',
        idTipoVista: '',
        idGranularidad: '',
        entidadOrigen: '',
        estado: false,
        idConfiguracionClasificacionRegulatoria: '',
        etiquetas: [],
        nombreCategoria: '',
      })
    );
    component.loadInfoBasicSubscription();
    component.idGenerationFile = 'h';
    component.ngOnInit();
    component.statusSave$ = new Observable((a) => a.next('error'));
    component.ngOnInit();
    component.onLoadDataAdminDataset();
    component.loadInfoBasicSubscription();
    component.handleChangeView({ view: 'listDataSets', idFileGeneration: '' });
    component.handleChangeView({ view: 'listDat', idFileGeneration: '' });
    component.loadColumnsInformation('hola');
    component.handleSaveSourceColumns(columnsSaveMock);
    component.handlesaveSourceColumnsVersionPurpose(columnsSaveMock);
    component.handleSaveData(saveDatasetMock);
    component.handleHasRecord({
      idConfigurationDataSet: 'ade905f7-cb05-4ff9-90d9-00979f798894',
    });
  });

  it('#onLoadDataSet() should be called', () => {
    const spy = spyOn(component, 'onLoadDataSet').and.callFake(() => null);
    component.onLoadDataSet();
    expect(spy).toHaveBeenCalled();
  });

  it('#onLoadDataAdminDataset() should be called', () => {
    const spy = spyOn(component, 'onLoadDataAdminDataset').and.callFake(
      () => null
    );
    component.onLoadDataAdminDataset();
    expect(spy).toHaveBeenCalled();
  });

  it('#onLoadDataAdminDataset() should be called', () => {
    const spy = spyOn(component, 'onLoadDataAdminDataset').and.callFake(
      () => null
    );
    component.onLoadDataAdminDataset();
    expect(spy).toHaveBeenCalled();
  });

  it('#loadInfoBasicSubscription() should be called', () => {
    const spy = spyOn(component, 'loadInfoBasicSubscription').and.callFake(
      () => null
    );
    component.loadInfoBasicSubscription();
    expect(spy).toHaveBeenCalled();
  });
});
