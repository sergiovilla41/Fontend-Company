export interface RegulatoryClassificationData {
    idConfiguracionClasificacionRegulatoria: string
    codigoDelta: string | null;
    descripcion: string | null;
    fechaCreacion: Date | null;
    deltaFinalAno: number | null;
    deltaFinalDiaMes: number | null;
    deltaFinalDiaSemana: { value: number | null; label?: string };
    deltaFinalDias: number | null;
    deltaFinalMes: { value: number | null; label?: string };
    deltaFinalMeses: number | null;
    deltaFinalPeriodo: { value: string | null; label?: string };
    deltaFinalSemanas: number | null;
    deltaInicialAno: number | null;
    deltaInicialDiaMes: number | null;
    deltaInicialDiaSemana: { value: number | null; label?: string };
    deltaInicialDias: number | null;
    deltaInicialMes: { value: number | null; label?: string };
    deltaInicialMeses: number | null;
    deltaInicialPeriodo: { value: string | null; label?: string };
    deltaInicialSemanas: number | null;
}