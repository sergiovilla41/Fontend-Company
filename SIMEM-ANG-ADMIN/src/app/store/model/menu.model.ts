export interface MenuModel{
  id: string,
  name: string,
  url?: string,
  icon?: string,
  children?: MenuModel[]
}
