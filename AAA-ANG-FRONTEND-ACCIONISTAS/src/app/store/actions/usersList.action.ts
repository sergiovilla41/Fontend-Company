import { createAction, props } from '@ngrx/store';
import { UsersList } from 'src/app/model/usersList.model';

export const validateUsersList = createAction('[Users API] validate usersList');
export const validateUsersListSuccess = createAction('validate usersList Success', props<{dataUserList: UsersList[]}>());
export const validateUsersListError = createAction('validate usersList error', props<{text: string, status: number}>());
