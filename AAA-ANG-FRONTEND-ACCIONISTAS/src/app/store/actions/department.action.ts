import { createAction, props } from '@ngrx/store';
import { countryCitiesInterface } from 'src/app/model/countryCities.model';

export const department = createAction('[Users API] get department and city',  props<{country: countryCitiesInterface}>());
export const departmentSuccess = createAction('validate get codepartment and cityuntry Success', props<{department: countryCitiesInterface[]}>());
export const departmentError = createAction('validate get department and city error', props<{msg: string, status: number}>());