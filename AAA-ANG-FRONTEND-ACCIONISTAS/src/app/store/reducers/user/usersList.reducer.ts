import { createReducer, on } from '@ngrx/store';
import { UsersList } from 'src/app/model/usersList.model';
import { validateUsersListError, validateUsersListSuccess } from '../../actions/usersList.action';

export interface statUserList {
  userlist: UsersList[];
  text?: string;
  status?: number;
}

export const userListInitialState: statUserList = {
  userlist: [],
}

export const usersListReducer = createReducer(
  userListInitialState,
  on(validateUsersListSuccess, (state, { dataUserList }) => {
    return { userlist: dataUserList }
  }),
  on(validateUsersListError, (state, { text, status }) => {
    return { ...state, text, status }
  })
)
