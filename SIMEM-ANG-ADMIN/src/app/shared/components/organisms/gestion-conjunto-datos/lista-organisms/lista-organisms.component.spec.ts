import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaOrganismsComponent } from './lista-organisms.component';

import { DataSetModel } from '../../../../../store/model/dataset/datasets.model';

const RECORDS: DataSetModel[] = [
  {
    idDataSet: 'ade905',
    idConfigurationFileGeneration: 'ade905f7-cb05-4ff9-90d9-00979f798894',
    title: 'Panorama energético Corto Plazo Generación',
    theme: 'InformacionOperativaPeriodicaSIN',
    fileNameDestination: '10_PanoramaEnergeticoCortoPlazoGeneracion',
    idGranularity: '7427d737-4840-4f8b-937c-5863feb23fb1',
    nameGranularity: 'ef427263-f704-4e33-bdba-9289f008a833',
    idPeriodicity: 'Semanal',
    periodicity: 'Semanal',
    nbSynapse: 'NB_InformacionOperativaPeriodicaSIN_GeneracionCasos',
    initialDeltaValue: new Date('2023-11-01T00:00:00'),
    finalDeltaValue: new Date('2023-11-30T00:00:00'),
    idGenerationFileMaster: '6e19f11a-bd78-4eb6-b551-0c62dee71007',
    generationFileMaster: '',
    state: true,
  },
];

describe('ListaOrganismsComponent', () => {
  let component: ListaOrganismsComponent;
  let fixture: ComponentFixture<ListaOrganismsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaOrganismsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaOrganismsComponent);
    component = fixture.componentInstance;
    component.dataSets = RECORDS;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should be called', () => {
    component.ngOnInit();
  });

  it('#onCreateItemMenu() should be called', () => {
    component.onCreateItemMenu();
  });

  it('#onCreateItemMenu() should be called', () => {
    component.onCreateItemMenu();
  });

  it('#ngOnChanges() should be called', () => {
    component.ngOnChanges({
      dataSets: {
        currentValue: RECORDS[0],
        firstChange: false,
        previousValue: [],
        isFirstChange: () => false,
      },
    });
  });

  it('#onClickMenu() should be called', () => {
    component.onEditDataset();
    component.handleClearFilterPicker();
  });
});
