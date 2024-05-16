export interface Seizure {
    ID_REGISTRO?: string;
    EMBARGO_UUID?: string;
    TITULO_UUID?: string;
    TITULO?: string;
    TIPO_PROCEDENCIA_UUID?: string;
    TIPO_PROCEDENCIA?: string;
    NOMBRE_ACCIONISTA?: string;
    ESTADO?: string;
    FECHA_INICIO?: string;
    FECHA_VENCIMIENTO?: string;
    TIPO_AUTO?: string;
    IDENTIFICACION_DEMANDANTE?: number;
    NOMBRE_DEMANDANTE?: string;
    VALOR_EMBARGO?: number;
    VALOR_DIVIDENDO?: number;
    JUZGADO?: string;
    OTRO_VALOR?: number;
    BIEN_EMBARGADO?: string;
    OBSERVACION?: string;
    IDENTIFICACION_BENEFICIARIO?: number;

    //rol y usuario del que hace peticion
    ROLADMIN?: number;
    EMAILADMIN?: string;
}