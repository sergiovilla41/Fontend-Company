import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganismsComponent } from './admin-organisms.component';
import {
  columnsSaveMock,
  saveDatasetMock,
} from '../../../../mocks/datasets.mock';
import { MessageService } from 'primeng/api';

describe('AdminOrganismsComponent', () => {
  let component: AdminOrganismsComponent;
  let fixture: ComponentFixture<AdminOrganismsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [AdminOrganismsComponent, MessageService],
    });

    fixture = TestBed.createComponent(AdminOrganismsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.goBack();
    component.handleSaveData(saveDatasetMock);
    component.handleSaveSourceColumns(columnsSaveMock);
    component.handlesaveSourceColumnsVersionPurpose(columnsSaveMock);

    component.handleHasRecord({
      idConfigurationDataSet: 'ade905f7-cb05-4ff9-90d9-00979f798894',
    });
  });
});
