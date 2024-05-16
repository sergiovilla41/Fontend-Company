export interface Payment {
    ID?:number,
    ASAMBLEA?:number,
    ESTADO?: number,
    NIT?: number,
    BENEFICIARIO?:string,
    CONCEPTO?:string,
    IMPORTE?:string,
    DOCU1?:string,
    NOPRIDOCU?:number,
    DOCU2?:string,
    NOSEGDOCU?:string,
    FECHAENTRE?:string,
    FECHAPAGO2?:string,
    RETETOTA?:string,
    PORRETE?:string,
    TIMTOTA?:string,
    PORTIMBRE?:string,
    IVATOTA?:string,
    PORIVA?:string,
    ICATOTA?:string,
    PORICA?:string,
    ESTATOTA?:string,
    POREST?:string,
    NOMITOTA?:string,
    FECHAENVIO?:string,
    NOCOMPRO?:string,
    FECHASISTE?:string,
    NOPAGO?:string,
    SOCIEDAD?:string,
    NOCHEQUE?:string,
    FECHENDOSO?:string,
    CHEQUERA?:string,
    CODBANCO?:string,
    NOCUENTA?:string,
    FORMAPAGO?:string,
    PARAMETRIZACION?:number,
    COMODIN?:string,
    SALDO_FAVOR?:number,
    COMPROBANTE?:string,
    COMODIN2?:string,
    FECHA_PAGO?:string,
    BENEFICIA_NIT?:string,
    RETENCION?:number,
    OBSERVACION?:string,
    FECHACREA?: Date,
    USUARIOCREA?: string,
    FECHAEDITA?:Date,
    USUARIOEDITA?:string,
    ID_REGISTRO?:string
    PAGO_UUID?:string




    //rol y usuario del que hace peticion
    ROLADMIN?: number;
    EMAILADMIN?: string;
}