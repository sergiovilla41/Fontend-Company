import { createReducer, on } from "@ngrx/store";
import { cleanCancelTitles, cleanStatusTraslados, getIncompleteTitlesSuccess, getTitlesListSelectorSuccess, getTranslatesListSuccess, setCancelTitles, setStatusTraslados } from "../../actions/traslado.action";
import { Traslado } from "src/app/model/traslado.model";
import { Titles } from "src/app/model/titles.model";

export interface TrasladoState {
  translates: Traslado[],
  count: number,
  cancelTitles: Titles[],
  titlesListSelector: Titles[],
  incompleteTitles: Titles[],
  status?: number,
  msg?: string
}

export const initialState: TrasladoState = {
  translates: [],
  count: 0,
  cancelTitles: (JSON.parse(localStorage.getItem('cancelTitles')))?JSON.parse(localStorage.getItem('cancelTitles')):[],
  titlesListSelector: [],
  incompleteTitles: []
}

export const trasladoReducer = createReducer(
  initialState,
  on(getTranslatesListSuccess, (state, { translates, count }) => ({ ...state, translates, count })),
  on(setCancelTitles, (state, { titles }) => {
    localStorage.setItem('cancelTitles', JSON.stringify(titles));
    return ({ ...state, cancelTitles: titles })
  }),
  on(cleanCancelTitles, (state) => {
    localStorage.removeItem('cancelTitles');
    return { ...state, cancelTitles: [] }
  }),
  on(getTitlesListSelectorSuccess, (state, {titlesListSelector}) => ({...state, titlesListSelector})),
  on(getIncompleteTitlesSuccess, (state, {titles}) => ({...state, incompleteTitles: titles})),
  on(setStatusTraslados, (state, {msg, status}) => ({...state, msg, status})),
  on(cleanStatusTraslados, (state) => ({...state, msg: undefined, status: undefined}))
)
