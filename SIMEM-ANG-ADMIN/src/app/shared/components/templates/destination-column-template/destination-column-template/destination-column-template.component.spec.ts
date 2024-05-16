import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationColumnComponentTemplate } from './destination-column-template.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { BackButtonComponent } from '../../../atoms/back-button/back-button.component';
import { CommonModule } from '@angular/common';
import { DestinationColumnModel } from '../../../../../store/model/destination-column/destination.column.model';

describe('DestinationColumnComponentTemplate', () => {
  let component: DestinationColumnComponentTemplate;
  let fixture: ComponentFixture<DestinationColumnComponentTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        CommonModule,
        CardModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationColumnComponentTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onFetch event when fetch method is called', () => {
    spyOn(component.onFetch, 'emit');
    component.fetch();
    expect(component.onFetch.emit).toHaveBeenCalled();
  });

  it('should emit addDestinationColumnClassification event when createDestinationColumn method is called', () => {
    spyOn(component.addDestinationColumnClassification, 'emit');
    const column: DestinationColumnModel = {
      idColumnaDestino: '1',
      nombreColumnaDestino: 'Nombre',
      tipoDato: 'Texto',
      descripcion: 'Descripción',
      atributoVariable: 'Atributo',
      variableId: null,
      estado: false,
      fechaActualizacion: null,
      fechaCreacion: new Date()
    };
    component.createDestinationColumn(column);
    expect(component.addDestinationColumnClassification.emit).toHaveBeenCalledWith(column);
  });

  it('should emit updateDestinationColumnClassification event when editDestinationColumn method is called', () => {
    spyOn(component.updateDestinationColumnClassification, 'emit');
    const column: DestinationColumnModel = {
      idColumnaDestino: '1',
      nombreColumnaDestino: 'Nombre',
      tipoDato: 'Texto',
      descripcion: 'Descripción',
      atributoVariable: 'Atributo',
      variableId: null,
      estado: false,
      fechaActualizacion: null,
      fechaCreacion: new Date()
    };
    component.editDestinationColumn(column);
    expect(component.updateDestinationColumnClassification.emit).toHaveBeenCalledWith(column);
  });
});

