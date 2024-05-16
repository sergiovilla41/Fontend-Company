import { createReducer, on } from '@ngrx/store';
import { countryCitiesInterface } from 'src/app/model/countryCities.model';
import { citiesError, citiesSuccess } from '../../actions/city.action';

export interface cityState {
  city?: countryCitiesInterface[];
}

export const cityInitialState: cityState = {
  city: [],
}

export const cityReducer = createReducer(
  cityInitialState,
  on(citiesSuccess, (state, { city }) => {
    return { city: city }
  }),
  on(citiesError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
