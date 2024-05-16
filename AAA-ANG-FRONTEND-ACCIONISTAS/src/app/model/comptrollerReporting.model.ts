export interface ComptrollerReporting {
    NIT_ACCIONISTA?: number;
    NOMBRE_ACCIONISTA?: string;
    CAPITAL_SUSCRITO?: number;
    PORCENTAJE_PARTICIPACION?: number;
    CAPITAL_PAGADO?: number;
    PARTICIPACION_PAGADO?: number;
    TOTAL_ACCIONES?: number;

    //rol y usuario del que hace peticion
    ROLADMIN?: number;
    EMAILADMIN?: string;
}