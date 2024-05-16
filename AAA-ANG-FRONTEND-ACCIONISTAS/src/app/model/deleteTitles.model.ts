import { Titles } from "./titles.model";

export interface DeleteTitles {

    //rol y usuario del que hace peticion
    ROLADMIN?: number;
    USUARIOEDITA?: string;
    ID_REGISTRO?: boolean;
}
