export interface Warranty {
    ID_REGISTRO?: string;
    GARANTIA_UUID?: string;
    TITULO_UUID?: string;
    TITULO?: string;
    NOMBRE_ACCIONISTA?: string;
    ESTADO?: string;
    FECHA_INICIO?: string;
    FECHA_FIN?: string;
    IDENTIFICACION_TERCERO?: number;
    NOMBRE_TERCERO?: string;
    OBSERVACION?: string;
    PLAZO?: number;

    //rol y usuario del que hace peticion
    ROLADMIN?: number;
    EMAILADMIN?: string;
}