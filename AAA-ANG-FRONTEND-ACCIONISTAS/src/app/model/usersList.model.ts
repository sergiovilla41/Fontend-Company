export interface UsersList {
    ID?: number;
    PRIMER_NOMBRE?: string;
    SEGUNDO_NOMBRE?: string;
    PRIMER_APELLIDO?: string;
    SEGUNDO_APELLIDO?: string;
    DOCUMENTO?: number;
    TELEFONO?: number;
    EMAIL?: string;
    CLAVE?: string;
    ROLE?: number;
    ESTADOS?: number;
    Fn_role?: {
        ID_REGISTRO: string;
        NOMBRE: string;
    };

    //rol y usuario del que hace peticion
    ROLADMIN?: number;
    EMAILADMIN?: string;
}
