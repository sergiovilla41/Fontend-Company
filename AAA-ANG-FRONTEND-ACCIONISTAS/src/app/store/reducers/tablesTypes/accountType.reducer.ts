import { createReducer, on } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';
import { accountTypeError, accountTypeSuccess } from '../../actions/accountType.action';


export interface accountTypeState {
    accountTypeList: TypesInterface[];
}

export const accountTypeListInitialState: accountTypeState = {
    accountTypeList: [],
}

export const accountTypeListReducer = createReducer(
  accountTypeListInitialState,
    on(accountTypeSuccess, (state, { accountTypeList }) => {
        return {accountTypeList: accountTypeList }
    }),
    on(accountTypeError, (state, { msg, status }) => {
        return { ...state, msg, status }
    })
)
