import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationOrganismsComponent } from './publication-organisms.component';
import { MessageService } from 'primeng/api';
import { PublicationModel } from '../../../../../store/model/publications/publication.model';
import { PublicationData } from '../../../../../store/interfaces/publications/publication.interface';
import { CommomDropdown } from '../../../../helpers/common-dropdown';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const publicationData: PublicationData = {
  idPublicacionRegulatoria: '0',
  idConfiguracionGeneracionArchivos: '0',
  dia: {
    value: null,
    label: (new CommomDropdown().GetDays() as any)['0']
  },
  mes: {
    value: null,
    label: (new CommomDropdown().GetMonthsMap() as any)['0'],
  },
  diaSemana: {
    value: null,
    label: (new CommomDropdown().GetWeekDaysMap() as any)['0'],
  },
  indDiaHabil: {
    value: null,
    label: (new CommomDropdown().GetYesNoMap() as any)['0'],
  },
  fechaCreacion: new Date(),
};

const publicationInformationData: PublicationModel = {
  idPublicacionRegulatoria: '0',
  idConfiguracionGeneracionArchivos: '0',
  indDiaHabil: true,
  dia: 0,
  mes: 0,
  diaSemana: null,
  fechaCreacion: new Date(),
};

describe('PublicationOrganismsComponent', () => {
  let component: PublicationOrganismsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ToastModule, MessagesModule],
      providers: [
        PublicationOrganismsComponent,
        MessageService,
        CommomDropdown,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = TestBed.inject(PublicationOrganismsComponent);
  });

  it("it", () => {
    component.data = [publicationData]
    component.ngOnInit()
    component.ngOnChanges()
    component.rowToDelete = publicationData
    component.deleteInfo()
    component.hideDialog()
  })
});
