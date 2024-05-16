import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

export const forgotPassword = createAction('forgotPassword', props<{email: User}>());
export const forgotPasswordSuccess = createAction('forgotPassword Success', props<{msg: string, status: number}>());
export const forgotPasswordError = createAction('forgotPassword error', props<{msg: string, value: string, param: string, status: number}>());

export const UpdateState = createAction('validate update state');