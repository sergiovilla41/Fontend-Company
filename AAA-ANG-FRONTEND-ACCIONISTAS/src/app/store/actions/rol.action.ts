import { createAction, props } from '@ngrx/store';

import { RolInterface } from 'src/app/model/rol.model';

export const userRol = createAction('[Users API] get rol');
export const userRolSuccess = createAction('validate get rolSuccess', props<{rolList: RolInterface[]}>());
export const userRolError = createAction('validate get rol error', props<{msg: string, status: number}>());
