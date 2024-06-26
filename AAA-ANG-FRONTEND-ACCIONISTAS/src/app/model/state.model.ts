import { assemblyState } from "../store/reducers/Assembly/assembly.reducer";
import { AsistenciaState } from "../store/reducers/asistencias/asistencias.reducer";
import { DividendoState } from "../store/reducers/dividendo/dividendo.reducer";
import { forgotPasswordState } from "../store/reducers/forgotPassword/forgotPassword.reducer";
import { paymentState } from "../store/reducers/payment/payment.reducer";
import { LiquidacionState } from "../store/reducers/liquidacion/liquidacion.reducer";
import { rolState } from "../store/reducers/rol/rol.reducer";
import { seizureState } from "../store/reducers/seizure/seizure.reducer";
import { shareholderState } from "../store/reducers/shareholder/shareholder.reducer";
import { TypeSourceState } from "../store/reducers/tablesTypes/TypeSource.reducer";
import { accountTypeState } from "../store/reducers/tablesTypes/accountType.reducer";
import { bankState } from "../store/reducers/tablesTypes/bank.reducer";
import { cityState } from "../store/reducers/tablesTypes/city.reducer";
import { countryState } from "../store/reducers/tablesTypes/country.reducer";
import { departmentState } from "../store/reducers/tablesTypes/department.reducer";
import { identificationTypeState } from "../store/reducers/tablesTypes/identificationType.reducer";
import { nacionalityTypeState } from "../store/reducers/tablesTypes/nacionalityType.reducer";
import { personTypesState } from "../store/reducers/tablesTypes/personType.reducer";
import { shareholderTypesState } from "../store/reducers/tablesTypes/shareholderType.reducer";
import { stateState } from "../store/reducers/tablesTypes/state.reducer";
import { typeOfFilerState } from "../store/reducers/tablesTypes/typeOfFiler.reducer";
import { titleState } from "../store/reducers/title/title.reducer";
import { TrasladoState } from "../store/reducers/traslado/traslado.reducer";
import { UserState } from "../store/reducers/user/user.reducer";
import { statUserList } from "../store/reducers/user/usersList.reducer";
import { VotacionState } from "../store/reducers/votacion/votacion.reducer";
import { warrantyState } from "../store/reducers/warranty/warranty.reducer";
import { reportState } from "../store/reducers/reports/reports.reducer";

export interface State {
  readonly userState: UserState;
  readonly forgotPasswordState: forgotPasswordState;
  readonly usersList: statUserList;
  readonly rolList: rolState;
  readonly personTypeList: personTypesState;
  readonly shareholderTypeList: shareholderTypesState;
  readonly typeOfFilerList: typeOfFilerState;
  readonly identificationTypeList: identificationTypeState;
  readonly bankList: bankState;
  readonly accountTypeList: accountTypeState;
  readonly nacionalityTypeList: nacionalityTypeState;
  readonly state: stateState;
  readonly country: countryState;
  readonly department: departmentState;
  readonly city: cityState;
  readonly titleState: titleState;
  readonly shareholderList: shareholderState;
  readonly shareholderSeizureList: shareholderState;
  readonly shareholderWarrantyList: shareholderState;
  readonly assemblystate: assemblyState;
  readonly typeSourceList: TypeSourceState;
  readonly traslados: TrasladoState;
  readonly seizureList: seizureState;
  readonly warrantyList: warrantyState;
  readonly votacion: VotacionState;
  readonly asistencia: AsistenciaState;
  readonly liquidacion: LiquidacionState;
  readonly dividendo: DividendoState;
  readonly paymentList: paymentState;
  readonly reportState: reportState;
  
}
