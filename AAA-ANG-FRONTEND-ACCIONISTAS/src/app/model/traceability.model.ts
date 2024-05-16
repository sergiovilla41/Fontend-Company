export interface Traceability {
    ID?: number;
    FECHA?: string;
    OBJETO_NUEVO?: string;
    OBJETO_IMPACTO?: string;
    EVENTO?: string;
    USUARIO?: number;

    //rol y usuario del que hace peticion
    ROLADMIN?: number;
    EMAILADMIN?: string;
}