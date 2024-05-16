export interface SourceColumnsSave {
  idColumnaOrigen: string;
  numeracion: number;
  columnaOrigen: string;
  idColumnaDestino: string;
  tipoDato: string;
  descripcion: string | null;
  idExtraccion: string;
  extraccionIdColumnaDestino: string;
  extraccionColumnaVersion: string;
}
