import { createReducer, on } from '@ngrx/store';
import { countryCitiesInterface } from 'src/app/model/countryCities.model';
import { countryError, countrySuccess } from '../../actions/country.action';

export interface countryState {
  country?: countryCitiesInterface[];
}

export const countryInitialState: countryState = {
  country: [],
}

export const countryReducer = createReducer(
  countryInitialState,
  on(countrySuccess, (state, { country }) => {
    return { country: country }
  }),
  on(countryError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
