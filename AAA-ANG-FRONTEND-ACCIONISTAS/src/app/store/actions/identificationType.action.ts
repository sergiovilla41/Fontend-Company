import { createAction, props } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';

export const identificationType = createAction('[Users API] get identification Type');
export const identificationTypeSuccess = createAction('validate get identification Type Success', props<{identificationTypeList: TypesInterface[]}>());
export const identificationTypeError = createAction('validate get identification Type error', props<{msg: string, status: number}>());