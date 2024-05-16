export interface Shareholders {
    ID_REGISTRO?: string;
    TIPO_ACCIONISTA?: string;
    TIPO_ACCIONISTA_UUID?: string;
    TIPO_PERSONA?: string;
    TIPO_PERSONA_UUID?: string;
    TIPO_DECLARANTE?: string;
    TIPO_DECLARANTE_UUID?: string;
    TIPO_DOCUMENTO?: string;
    TIPO_DOCUMENTO_UUID?: string;
    ESTADO?: string;
    ESTADO_UUID?: string;
    IDENTIFICACION?: number;
    IDENTIFICACION_ACCIONISTA?: Number;
    FECHA_EXPEDICION?: string;
    LUGAR_EXPEDICION?: string;
    PRIMER_NOMBRE?: string;
    SEGUNDO_NOMBRE?: string;
    PRIMER_APELLIDO?: string;
    SEGUNDO_APELLIDO?: string;
    EMPRESA?: string;
    REPRESENTANTE?: string;
    DIRECCION?: string;
    TELEFONO_1?: number;
    TELEFONO_2?: number;
    EMAIL_1?: string;
    EMAIL_2?: string;
    PAIS?: string;
    DEPARTAMENTO?: number;
    CIUDAD?: number;
    FECHACREA?: Date;
    USUARIOCREA?: string;
    FECHAEDITA?: Date;
    USUARIOEDITA?: string;
    BANCO?: string;
    BANCO_UUID?: string;
    TIPO_CUENTA?: string;
    TIPO_CUENTA_UUID?: string;
    NRO_CUENTA?: string;
    NACIONALIDAD?: string;
    NACIONALIDAD_UUID?: string;
    COMODIN?: string;
    NOMBRE?: string;

    //rol y usuario del que hace peticion
    ROLADMIN?: number;
    EMAILADMIN?: string;
}