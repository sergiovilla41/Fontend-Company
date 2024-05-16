import { createAction, props } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';

export const stateTrue = createAction('[Users API] get state true');
export const stateTrueSuccess = createAction('validate get state true Success', props<{stateTrue: TypesInterface[]}>());
export const stateTrueError = createAction('validate get state true error', props<{msg: string, status: number}>());