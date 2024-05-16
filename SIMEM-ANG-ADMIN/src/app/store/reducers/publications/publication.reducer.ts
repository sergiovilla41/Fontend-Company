import { createReducer, on } from '@ngrx/store';
import { PublicationModel } from '../../model/publications/publication.model';
import { getPublicationInformationSuccess } from '../../actions/publications/publication.action';

export interface PublicationInformationState {
  publicationInformation: PublicationModel[];
  publicationDataState: string;
}

export const publicationInformationState: PublicationInformationState = {
  publicationInformation: [],
  publicationDataState: 'OK',
};

export const publicationReducer = createReducer(
    publicationInformationState,
  on(getPublicationInformationSuccess, (state, { publicationInformation }) => {
    return { ...state, publicationInformation, publicationDataState: 'OK' };
  })
);
