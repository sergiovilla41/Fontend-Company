import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/model/user.model';
import { UsersList } from 'src/app/model/usersList.model';

export const validateUser = createAction('[Users API] validate user', props<{ user: User }>());
export const validateUserSuccess = createAction('validate user Success', props<{ isUser: boolean, dataLogin: string }>());
export const validateUserError = createAction('validate user error', props<{ text: string, status: number }>());
export const logout = createAction('logout');


export const newUser = createAction('[Users API] create new user', props<{ user: UsersList }>());
export const newUserSuccess = createAction('validate create new user Success', props<{ msg: string, status: number }>());
export const newUserError = createAction('validate create new user error', props<{ msg: string, status: number }>());


export const UpdateUser = createAction('[Users API]  update a user', props<{ user: UsersList }>());
export const UpdateUserSuccess = createAction('validate  update a user Success', props<{ msg: string, status: number }>());
export const UpdateUserError = createAction('validate  update a user error', props<{ msg: string, status: number }>());


export const deleteUser = createAction('[Users API] delete  a user', props<{ user: UsersList }>());
export const deletUserSuccess = createAction('validate delete a user Success', props<{ msg: string, status: number }>());
export const deletUserError = createAction('validate delete a user error', props<{ msg: string, status: number }>());


export const exportExcelUsers = createAction('[Users API] export Excel Users', props<{ payload: any }>());
export const exportExcelUsersSuccess = createAction('validate export Excel Users Success', props<{ payload: any }>());
export const exportExcelUsersError = createAction('validate export Excel Users error', props<{ msg: string, status: number }>());


export const exportCsvUsers  = createAction('[Users API] Export CSV Users', props<{ payload: any }>());
export const exportCsvUsersSuccess = createAction('validate Export CSV Users Success', props<{ payload: any }>());
export const exportCsvUsersError = createAction('validate Export CSV Users error', props<{ msg: string, status: number }>());


export const exportPdfUsers  = createAction('[Users API] Export Pdf Users', props<{ payload: any }>());
export const exportPdfUsersSuccess = createAction('validate Export Pdf Users Success', props<{ payload: any }>());
export const exportPdfUsersError = createAction('validate Export Pdf Users error', props<{ msg: string, status: number }>());

export const UpdateState = createAction('validate update state');