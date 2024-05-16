export interface ExecutionResponse {
    idEjecucion: string;
    idConfiguracionGeneracionArchivos: string;
    dia: number | null;
    mes: number | null;
    hora: number;
    diaSemana: number | null;
    indDiaHabil: boolean;
    indActivo: boolean;
    fechaCreacion: Date;
    fechaActualizacion: Date | null;
  }
  
  export interface ExecutionData {
    idEjecucion: string;
    idConfiguracionGeneracionArchivos : string;
    dia : { value :  number | null , label? : number};
    mes : { value :  number | null , label? : string};
    diaSemana :  { value :  number | null , label? : string};
    hora : { value :  number | null , label? : string};
    indDiaHabil :  { value :  boolean | null , label? : string};
    indActivo :  { value :  boolean | null , label? : string};
    fechaCreacion : Date | null;
    fechaActualizacion : Date | null;
  }