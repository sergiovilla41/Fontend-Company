import { createReducer, on } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';
import { bankError, bankSuccess } from '../../actions/bank.action';
import { typeOfFilerError, typeOfFilerSuccess } from '../../actions/typeOfFiler.action';

export interface bankState {
  bankList: TypesInterface[];
}

export const bankListInitialState: bankState = {
  bankList: [],
}

export const bankListReducer = createReducer(
  bankListInitialState,
  on(bankSuccess, (state, { bankList }) => {
    return { bankList: bankList }
  }),
  on(bankError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
