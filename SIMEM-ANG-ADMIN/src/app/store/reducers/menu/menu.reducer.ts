import { createReducer, on } from "@ngrx/store";
import { MenuModel } from "../../model/menu.model";
import { getMenuItemsSuccess } from "../../actions/menu.action";

export interface MenuInitialState{
  menuItems: MenuModel[]
}

export const menuInitialState: MenuInitialState = {
  menuItems: []
}

export const menuReducer = createReducer(
  menuInitialState,
  on(getMenuItemsSuccess, (state, {menuItems}) => {
    return ({...state, menuItems})
  })
)
