import { createAction, props } from "@ngrx/store";
import { MenuModel } from "../model/menu.model";

export const getMenuItems = createAction("getMenuItems")
export const getMenuItemsSuccess = createAction("getMenuItemsSuccess", props<{menuItems: MenuModel[]}>())
export const getMenuItemsError = createAction("getMenuItemsError")
