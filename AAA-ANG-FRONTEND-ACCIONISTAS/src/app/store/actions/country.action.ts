import { createAction, props } from '@ngrx/store';
import { countryCitiesInterface } from 'src/app/model/countryCities.model';
import { TypesInterface } from 'src/app/model/types.model';

export const country = createAction('[Users API] get country');
export const countrySuccess = createAction('validate get country Success', props<{country: countryCitiesInterface[]}>());
export const countryError = createAction('validate get country error', props<{msg: string, status: number}>());