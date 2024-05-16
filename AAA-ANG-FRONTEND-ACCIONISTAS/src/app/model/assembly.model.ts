export interface Assembly {
    ID?:number,
    TIPO?:number,
    ESTADO?: number,
    FECHA_ASAMBLEA?: Date,
    NOTIFICAR_ASISTENTES?: number,
    ESTADO_NOTIFICACION?: number,
    FECHACREA?: Date,
    USUARIOCREA?: string,
    FECHAEDITA?:Date,
    USUARIOEDITA?:string,
    OBSERVACION?:string,
    ASISTENTES?:number,
    QUORUM?:number,
    ID_REGISTRO?:string,
    
    //rol y usuario del que hace peticion
    ROLADMIN?: number;
    EMAILADMIN?: string;
    CHECKED?: boolean;
}