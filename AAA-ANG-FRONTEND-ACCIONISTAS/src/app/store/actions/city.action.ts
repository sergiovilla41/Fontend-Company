import { createAction, props } from '@ngrx/store';
import { countryCitiesInterface } from 'src/app/model/countryCities.model';

export const cities = createAction('[Users API] get city',  props<{countryDepartment: countryCitiesInterface}>());
export const citiesSuccess = createAction('validate get city Success', props<{city: countryCitiesInterface[]}>());
export const citiesError = createAction('validate get city error', props<{msg: string, status: number}>());