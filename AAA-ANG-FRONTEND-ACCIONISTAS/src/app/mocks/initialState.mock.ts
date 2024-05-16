import { State } from "../model/state.model";
import { assemblyInitialState } from "../store/reducers/Assembly/assembly.reducer";
import { forgotPasswordInitialState } from "../store/reducers/forgotPassword/forgotPassword.reducer";
import { rolListInitialState } from "../store/reducers/rol/rol.reducer";
import { shareholderInitialState } from "../store/reducers/shareholder/shareholder.reducer";
import { accountTypeListInitialState } from "../store/reducers/tablesTypes/accountType.reducer";
import { bankListInitialState } from "../store/reducers/tablesTypes/bank.reducer";
import { cityInitialState } from "../store/reducers/tablesTypes/city.reducer";
import { countryInitialState } from "../store/reducers/tablesTypes/country.reducer";
import { departamentInitialState } from "../store/reducers/tablesTypes/department.reducer";
import { identificationTypeInitialState } from "../store/reducers/tablesTypes/identificationType.reducer";
import { nacionalityTypeListInitialState } from "../store/reducers/tablesTypes/nacionalityType.reducer";
import { personTypeInitialState } from "../store/reducers/tablesTypes/personType.reducer";
import { shareholderTypeInitialState } from "../store/reducers/tablesTypes/shareholderType.reducer";
import { stateInitialState } from "../store/reducers/tablesTypes/state.reducer";
import { typeOfFilterListInitialState } from "../store/reducers/tablesTypes/typeOfFiler.reducer";
import { titleInitialState } from "../store/reducers/title/title.reducer";
import { userInitialState } from "../store/reducers/user/user.reducer";
import { userListInitialState } from "../store/reducers/user/usersList.reducer";

export const storeInitialStateMock: State = {
    userState: userInitialState,
    forgotPasswordState: forgotPasswordInitialState,
    usersList: userListInitialState,
    rolList: rolListInitialState,
    shareholderTypeList: shareholderTypeInitialState,
    personTypeList: personTypeInitialState,
    typeOfFilerList: typeOfFilterListInitialState,
    identificationTypeList: identificationTypeInitialState,
    bankList: bankListInitialState,
    accountTypeList: accountTypeListInitialState,
    nacionalityTypeList: nacionalityTypeListInitialState,
    state: stateInitialState,
    country: countryInitialState,
    department: departamentInitialState,
    city: cityInitialState,
    shareholderList: shareholderInitialState,
    titleState: titleInitialState,
    assemblystate: assemblyInitialState
}
