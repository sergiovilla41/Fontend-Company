import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MenuService, menuResponseToMenuModel } from "../../http/menu/menu.service";
import { getMenuItems, getMenuItemsSuccess } from "../../actions/menu.action";
import { exhaustMap, map } from "rxjs";

@Injectable()
export class MenuEffect {
  constructor(private actions$: Actions, private service: MenuService) { }

  getMenuItems$ = createEffect(() => this.actions$.pipe(
    ofType(getMenuItems),
    exhaustMap(() => this.service.getMenu()
      .pipe(
        map((menuItems) => getMenuItemsSuccess({ menuItems: menuItems.map(a => menuResponseToMenuModel(a)) }))
      ))
  )
  );
}
