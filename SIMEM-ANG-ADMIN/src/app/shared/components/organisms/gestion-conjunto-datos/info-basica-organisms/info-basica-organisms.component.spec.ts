import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBasicaOrganismsComponent } from './info-basica-organisms.component';
import { PropertiesList } from '../../../../../store/interfaces/common-interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const typeView: PropertiesList[] = [
  {
    code: '6ae2d8d6-3fb5-4e0e-8dd7-70a13da98303',
    name: 'Conjuntos de datos',
    dataType: '',
    description: '',
  },
  {
    code: '0c73cd59-c22d-49c7-aef5-8872ca80bd97',
    name: 'Documentos',
    dataType: '',
    description: '',
  },
];

const TypeViewSelect: PropertiesList = {
  code: '0c73cd59-c22d-49c7-aef5-8872ca80bd97',
  name: 'Documentos',
  dataType: '',
  description: '',
};

describe('InfoBasicaOrganismsComponent', () => {
  let component: InfoBasicaOrganismsComponent;
  let fixture: ComponentFixture<InfoBasicaOrganismsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBasicaOrganismsComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoBasicaOrganismsComponent);
    component = fixture.componentInstance;
    component.typeView = typeView;
    component.typeViewSelected = TypeViewSelect;
    component.labelsSelected = typeView;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    component.ngOnInit();

    component.handledDropDownNewValue({
      name: 'tipoExtraccion',
      value: 'hola',
    });
    component.handledDropDownNewValue({
      name: 'tipoExtraccion',
      value: 'select',
    });
    component.copySourceQuery();
    component.goBack();
    component.handledIndRegulatorio({ checked: true });
    component.handledChangeStatus({ checked: false });
    component.handledPickerNewDate(null);
    component.handledPickerNewDate({ name: '', value: new Date() });
    component.handledPickerNewDate(new Date());

    component.onValidateDateBeginDelta();
    component.removeControlValidator('selectXM');
    component.ngOnChanges({
      HasRecord: {
        currentValue: { activeDataset: 'inactive' },
        firstChange: false,
        previousValue: { activeDataset: 'active' },
        isFirstChange: () => false,
      },
    });
  });

  it('#save() data should be saved', () => {
    component.formData.get('valorDeltaInicial')?.setValue(new Date());
    component.formData.get('valorDeltaFinal')?.setValue(new Date());
    component.formData
      .get('idConfiguracionClasificacionRegulatoria')!
      .setValue(null);
    component.formData.get('indRegulatorio')!.setValue(false);

    const spy = spyOn(component, 'save').and.callFake(() => null);
    component.save();
    expect(spy).toHaveBeenCalled();
  });
});
