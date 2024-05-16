import { createAction, props } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';

export const nacionalityType = createAction('[Users API] get nacionality Type');
export const nacionalityTypeSuccess = createAction('validate get nacionality Type Success', props<{nacionalityTypeList: TypesInterface[]}>());
export const nacionalityTypeError = createAction('validate get nacionality Type error', props<{msg: string, status: number}>());