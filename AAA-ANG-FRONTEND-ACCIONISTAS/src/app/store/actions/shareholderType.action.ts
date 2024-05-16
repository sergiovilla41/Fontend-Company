import { createAction, props } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';

export const shareholderTypes = createAction('[Users API] get shareholder Types');
export const shareholderTypesSuccess = createAction('validate get shareholder Types Success', props<{shareholdersTypesList: TypesInterface[]}>());
export const shareholderTypesError = createAction('validate get shareholder Types error', props<{msg: string, status: number}>());