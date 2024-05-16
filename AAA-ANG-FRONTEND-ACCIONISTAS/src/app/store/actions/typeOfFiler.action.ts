import { createAction, props } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';

export const typeOfFiler = createAction('[Users API] get typeOfFiler Types');
export const typeOfFilerSuccess = createAction('validate get typeOfFiler Types Success', props<{typeOfFilerList: TypesInterface[]}>());
export const typeOfFilerError = createAction('validate get typeOfFiler Types error', props<{msg: string, status: number}>());