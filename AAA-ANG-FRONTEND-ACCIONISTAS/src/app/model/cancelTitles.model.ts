import { Titles } from "./titles.model";

export interface CancelTitles {
    DATA?: Titles[];
    
    //rol y usuario del que hace peticion
    ROLADMIN?: number;
    EMAILADMIN?: string;
    CHECKED?: boolean;
}