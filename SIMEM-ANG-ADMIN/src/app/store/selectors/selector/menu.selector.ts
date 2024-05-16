import { MenuItem } from 'primeng/api';
import { State } from '../../model/state.model';
import { MenuModel } from '../../model/menu.model';

export const selectMenuItems = (state: State) =>
  state?.menu?.menuItems?.map((val): MenuItem => menuModelToMenuItem(val));

export const menuModelToMenuItem = (a: MenuModel): MenuItem => ({
  id: a?.id,
  label: a?.name,
  routerLink: a?.children ? undefined : [a?.url],
  icon: a?.icon,
  items: a?.children?.map((b) => menuModelToMenuItem(b)),
});
