import { createAction, props } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';

export const TypeSource = createAction('[Users API] get Type Source');
export const TypeSourceSuccess = createAction('validate get Type Source Success', props<{typeSourceList: TypesInterface[]}>());
export const TypeSourceError = createAction('validate get Type Source error', props<{msg: string, status: number}>());