import { createAction, props } from "@ngrx/store";
import { Dividendo } from "src/app/model/dividendo.model";
import { DistribuirDividendo } from "src/app/model/distribuirDividendo";


export const addDividendo = createAction('add dividendo', props<{dividendo: Dividendo}>())
export const addDividendoSuccess = createAction('add dividendo success', props<{msg: string, status: number}>())

export const distributeDividendo = createAction('distribuir dividendo', props<{distribuirDividendo: DistribuirDividendo}>())
export const distributeDividendoSuccess = createAction('distribuir dividendo success', props<{msg: string, status: number}>())

export const cleanStateDividendo = createAction('clean state dividendo')

