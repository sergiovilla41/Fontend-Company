export interface PublicationResponse {
    idPublicacionRegulatoria: string;
    idConfiguracionGeneracionArchivos: string;
    dia: number | null;
    mes: number | null;
    diaSemana: number | null;
    indDiaHabil: boolean | null;
    fechaCreacion: Date | null;
  }
  
  export interface PublicationData {
    idPublicacionRegulatoria : string;
    idConfiguracionGeneracionArchivos : string;
    dia : { value :  number | null , label? : number};
    mes : { value :  number | null , label? : string};
    diaSemana :  { value :  number | null , label? : string};
    indDiaHabil :  { value :  boolean | null , label? : string};
    fechaCreacion : Date | null;
  }