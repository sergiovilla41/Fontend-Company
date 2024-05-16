import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionConjuntosDatosTemplateComponent } from './gestion-conjuntos-datos-template.component';

describe('ListaOrganismsComponent', () => {
  let component: GestionConjuntosDatosTemplateComponent;
  let fixture: ComponentFixture<GestionConjuntosDatosTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionConjuntosDatosTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionConjuntosDatosTemplateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    component.handleChangeView({
      view: 'listDataSets',
      idFileGeneration: 'id',
    });
    component.handleChangeView({ view: 'liataSets', idFileGeneration: 'id' });
    component.handleSaveData(null);
    component.handleSaveData({ hola: '' });
    component.handleSaveSourceColumns(null);
    component.handleSaveSourceColumns({ hola: 'hola' });
    component.handlesaveSourceColumnsVersionPurpose(null);
    component.handlesaveSourceColumnsVersionPurpose({ hola: 'hola' });
    component.handleHasRecord({
      idConfigurationDataSet: 'ade905f7-cb05-4ff9-90d9-00979f798894',
    });
  });
});
