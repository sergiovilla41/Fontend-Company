import { createAction, props } from '@ngrx/store';
import { PublicationModel } from '../../model/publications/publication.model';

export const getPublicationInformation = createAction(
  'getPublicationInformation',
  props<{ idConfiguracionGeneracionArchivos: string }>()
);
export const getPublicationInformationSuccess = createAction(
  'getPublicationInformationSuccess',
  props<{ publicationInformation: PublicationModel[] }>()
);
export const getPublicationInformationError = createAction('getPublicationInformationError');

export const savePublicationInformation = createAction(
  'savePublicationInformation',
  props<{ publicationInformation: PublicationModel }>()
);

export const updatePublicationInformation = createAction(
  'updatePublicationInformation',
  props<{ publicationInformation: PublicationModel }>()
);

export const deletePublicationInformation = createAction(
  'deletePublicationInformation',
  props<{ publicationInformation: PublicationModel }>()
);

export const savePublicationInformationError = createAction('savePublicationInformationError');