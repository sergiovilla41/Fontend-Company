import { createAction, props } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';

export const personTypes = createAction('[Users API] get person Types');
export const personTypesSuccess = createAction('validate get person Types Success', props<{personTypesList: TypesInterface[]}>());
export const personTypesError = createAction('validate get person Types error', props<{msg: string, status: number}>());