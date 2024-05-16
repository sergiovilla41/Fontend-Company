import { createAction, props } from '@ngrx/store';
import { TablaCargar } from 'src/app/interfaces/shareholders.interface';

// reporte de contraloria

export const exportExcelComptrollerReporting = createAction('[Report API] export Excel comptroller Reporting', props<{ paginador: TablaCargar }>());
export const exportExcelComptrollerReportingSuccess = createAction('validate export Excel comptroller ReportingSuccess', props<{ payload: any }>());
export const exportExcelComptrollerReportingError = createAction('validate export Excel comptroller Reporting error', props<{ msg: string, status: number }>());

export const exportCsvComptrollerReporting = createAction('[Report API] export csv comptroller Reporting', props<{ paginador: TablaCargar }>());
export const exportCsvComptrollerReportingSuccess = createAction('validate export csv comptroller Reporting Success', props<{ payload: any }>());
export const exportCsvComptrollerReportingError = createAction('validate export csv comptroller Reporting error', props<{ msg: string, status: number }>());

export const exportPdfComptrollerReporting = createAction('[Report API] export Pdf comptroller Reporting', props<{ paginador: TablaCargar }>());
export const exportPdfComptrollerReportingSuccess = createAction('validate export Pdf comptroller Reporting Success', props<{ payload: any }>());
export const exportPdfComptrollerReportingError = createAction('validate export Pdf comptroller Reporting error', props<{ msg: string, status: number }>());


// libro de accionistas

//export const exportPdfShareholderBook = createAction('[Report API] export Pdf shareholder book', props<{ paginador: TablaCargar }>());
export const exportPdfShareholderBook = createAction('[Report API] export Pdf shareholder book');
export const exportPdfShareholderBookSuccess = createAction('validate export Pdf shareholder book Success', props<{ payload: any }>());
export const exportPdfShareholderBookError = createAction('validate export Pdf shareholder book error', props<{ msg: string, status: number }>());


// informe super sociedades

//export const exportPdfShareholderBook = createAction('[Report API] export Pdf shareholder book', props<{ paginador: TablaCargar }>());
export const exportPdfSuperSocietiesReport = createAction('[Report API] export Pdf super societies report');
export const exportPdfSuperSocietiesReportSuccess = createAction('validate export Pdf super societies report Success', props<{ payload: any }>());
export const exportPdfSuperSocietiesReportError = createAction('validate export Pdf super societies report error', props<{ msg: string, status: number }>());


// reporte dian

//export const exportPdfShareholderBook = createAction('[Report API] export Pdf shareholder book', props<{ paginador: TablaCargar }>());
export const exportPdfReportDian = createAction('[Report API] export Pdf report Dian');
export const exportPdfReportDianSuccess = createAction('validate export Pdf report Dian Success', props<{ payload: any }>());
export const exportPdfReportDianError = createAction('validate export Pdf report Dian error', props<{ msg: string, status: number }>());


// reporte de votaciones

export const exportPdfBallotReport = createAction('[Report API] export Pdf ballot report', props<{ id_registro: String }>());
export const exportPdfSuperBallotReportSuccess = createAction('validate export ballot report Success', props<{ payload: any }>());
export const exportPdfSuperBallotReportError = createAction('validate export Pdf ballot report error', props<{ msg: string, status: number }>());


// impresion de tarjetones

export const exportPdfPrintingCards = createAction('[Report API] export Pdf printing cards', props<{ id_registro: String }>());
export const exportPdfPrintingCardsSuccess = createAction('validate export printing cards Success', props<{ payload: any }>());
export const exportPdfPrintingCardsError = createAction('validate export Pdf printing cards error', props<{ msg: string, status: number }>());


// registro libro de accionistas

export const exportExcelShareholderLedgerRegister = createAction('[Report API] export Excel Shareholder Ledger Register', props<{ anio: number }>());
export const exportExcelShareholderLedgerRegisterSuccess = createAction('validate export Shareholder Ledger Register Success', props<{ payload: any }>());
export const exportExcelShareholderLedgerRegisterError = createAction('validate export Shareholder Ledger Register error', props<{ msg: string, status: number }>());


// certificado de accionistas

export const exportPdfShareholderCertificate = createAction('[Report API] export Pdf Shareholder Certificate', props<{ id_registro: string, atn: string, fecha_capital: string, fecha_intrinseco: string, valor_intrinseco: number }>());
export const exportPdfShareholderCertificateSuccess = createAction('validate export Shareholder Certificate Success', props<{ payload: any }>());
export const exportPdfShareholderCertificateError = createAction('validate export Shareholder Certificate error', props<{ msg: string, status: number }>());


// Reporte embargos por accionista

export const exportPdfSeizureShareholder = createAction('[Report API] export Pdf seizure shareholder', props<{ id_registro: String }>());
export const exportPdfSeizureShareholderSuccess = createAction('validate export seizure shareholder Success', props<{ payload: any }>());
export const exportPdfSeizureShareholderError = createAction('validate export Pdf seizure shareholder error', props<{ msg: string, status: number }>());


// Reporte garantias por accionista

export const exportPdfWarrantyShareholder = createAction('[Report API] export Pdf Warranty shareholder', props<{ id_registro: String }>());
export const exportPdfWarrantyShareholderSuccess = createAction('validate export Warranty shareholder Success', props<{ payload: any }>());
export const exportPdfWarrantyShareholderError = createAction('validate export Pdf Warranty shareholder error', props<{ msg: string, status: number }>());


// Imprimir titulo

export const exportPdfTitleShareholder = createAction('[Report API] export Pdf Title shareholder', props<{ acionista_uuid: string, titulo_uuid: string }>());
export const exportPdfTitleShareholderSuccess = createAction('validate export Title shareholder Success', props<{ payload: any }>());
export const exportPdfTitleShareholderError = createAction('validate export Pdf Title shareholder error', props<{ msg: string, status: number }>());


// Liquidacion y pagos

export const exportPdfSettlementpayment = createAction('[Report API] export Pdf Settlement payment', props<{ acionista_uuid: string, anios: number }>());
export const exportPdfSettlementpaymentSuccess = createAction('validate export Settlement payment Success', props<{ payload: any }>());
export const exportPdfSettlementpaymentError = createAction('validate export Pdf Settlement payment error', props<{ msg: string, status: number }>());


// reporte de consulta de pagos CON paginador

/* export const exportExcelPaymentQuery = createAction('[Report API] export Excel Payment Query ', props<{ paginador: TablaCargar }>());
export const exportExcelPaymentQuerySuccess = createAction('validate export Excel Payment Query Success', props<{ payload: any }>());
export const exportExcelPaymentQueryError = createAction('validate export Excel Payment Query  error', props<{ msg: string, status: number }>());

export const exportCsvPaymentQuery = createAction('[Report API] export csv Payment Query ', props<{ paginador: TablaCargar }>());
export const exportCsvPaymentQuerySuccess = createAction('validate export csv Payment Query  Success', props<{ payload: any }>());
export const exportCsvPaymentQueryError = createAction('validate export csv Payment Query  error', props<{ msg: string, status: number }>());

export const exportPdfPaymentQuery = createAction('[Report API] export Pdf Payment Query ', props<{ paginador: TablaCargar }>());
export const exportPdfPaymentQuerySuccess = createAction('validate export Pdf Payment Query  Success', props<{ payload: any }>());
export const exportPdfPaymentQueryError = createAction('validate export Pdf Payment Query  error', props<{ msg: string, status: number }>()); */


// reporte de consulta de pagos SIN paginador

export const exportExcelPaymentQuery = createAction('[Report API] export Excel Payment Query ');
export const exportExcelPaymentQuerySuccess = createAction('validate export Excel Payment Query Success', props<{ payload: any }>());
export const exportExcelPaymentQueryError = createAction('validate export Excel Payment Query  error', props<{ msg: string, status: number }>());

export const exportCsvPaymentQuery = createAction('[Report API] export csv Payment Query ');
export const exportCsvPaymentQuerySuccess = createAction('validate export csv Payment Query  Success', props<{ payload: any }>());
export const exportCsvPaymentQueryError = createAction('validate export csv Payment Query  error', props<{ msg: string, status: number }>());

export const exportPdfPaymentQuery = createAction('[Report API] export Pdf Payment Query ');
export const exportPdfPaymentQuerySuccess = createAction('validate export Pdf Payment Query  Success', props<{ payload: any }>());
export const exportPdfPaymentQueryError = createAction('validate export Pdf Payment Query  error', props<{ msg: string, status: number }>());



export const UpdateStateReports = createAction('validate update state');
