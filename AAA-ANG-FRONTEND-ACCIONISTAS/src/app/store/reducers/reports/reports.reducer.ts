import { createReducer, on } from '@ngrx/store';
import { cancelTitleError, cancelTitleSuccess, cleanState, exportCsvTitle, exportCsvTitleError, exportCsvTitleSuccess, exportExcelTitle, exportExcelTitleError, exportExcelTitleSuccess, exportPdfTitle, exportPdfTitleError, exportPdfTitleSuccess, newTitleError, newTitleSuccess, titleListError, titleListSuccess, UpdateStateTitle, editTitle, editTitleError, editTitleSuccess } from '../../actions/title.action';
import { Titles } from 'src/app/model/titles.model';
import { exportExcelComptrollerReporting, exportExcelComptrollerReportingSuccess, exportExcelComptrollerReportingError, UpdateStateReports, exportCsvComptrollerReporting, exportCsvComptrollerReportingError, exportCsvComptrollerReportingSuccess, exportPdfComptrollerReporting, exportPdfComptrollerReportingError, exportPdfComptrollerReportingSuccess, exportPdfShareholderBookSuccess, exportPdfShareholderBook, exportPdfShareholderBookError, exportPdfSuperSocietiesReportSuccess, exportPdfSuperSocietiesReportError, exportPdfSuperSocietiesReport, exportPdfSuperBallotReportError, exportPdfSuperBallotReportSuccess, exportPdfBallotReport, exportPdfPrintingCards, exportPdfPrintingCardsSuccess, exportPdfPrintingCardsError, exportExcelShareholderLedgerRegisterSuccess, exportExcelShareholderLedgerRegister, exportExcelShareholderLedgerRegisterError, exportPdfShareholderCertificateSuccess, exportPdfShareholderCertificate, exportPdfShareholderCertificateError, exportPdfSeizureShareholder, exportPdfSeizureShareholderSuccess, exportPdfSeizureShareholderError, exportPdfWarrantyShareholder, exportPdfWarrantyShareholderSuccess, exportPdfWarrantyShareholderError, exportPdfTitleShareholder, exportPdfTitleShareholderSuccess, exportPdfTitleShareholderError, exportPdfSettlementpaymentError, exportPdfSettlementpaymentSuccess, exportPdfSettlementpayment, exportCsvPaymentQuery, exportCsvPaymentQueryError, exportCsvPaymentQuerySuccess, exportExcelPaymentQuery, exportExcelPaymentQueryError, exportExcelPaymentQuerySuccess, exportPdfPaymentQuery, exportPdfPaymentQueryError, exportPdfPaymentQuerySuccess, exportPdfReportDian, exportPdfReportDianError, exportPdfReportDianSuccess } from '../../actions/reports.action';

export interface reportState {
    msg?: string;
    isUser?: boolean;
    text?: string;
    state?: number;
    token?: string;
    error?: [];
    status?: number;
    titleList?: Titles[];
    isLoading?: boolean;
}
export const reportInitialState: reportState = {
  isLoading: false
}

export const reportsReducer = createReducer(
  reportInitialState,
    on(exportExcelComptrollerReporting, (state) => ({ ...state, isLoading: true })),
    on(exportExcelComptrollerReportingSuccess, (state, { payload }) => {
      const blob = new Blob([payload], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Composición accionaria (Contraloria distrital) " + fechaFormateada;

    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { ...state, isLoading: false };
  }),
  on(exportExcelComptrollerReportingError, (state) => {
    return { ...state, isLoading: false }
  }),
  on(exportCsvComptrollerReporting, (state) => ({ ...state, isLoading: true })),
  on(exportCsvComptrollerReportingSuccess, (state, { payload }) => {
    const csv = payload; 
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Composición accionaria (Contraloria distrital) " + fechaFormateada + ".csv";

    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { ...state, isLoading: false };
  }),
  on(exportCsvComptrollerReportingError, (state) => {
    return { ...state, isLoading: false }
  }),
  on(exportPdfComptrollerReporting, (state) => ({ ...state, isLoading: true })),
  on(exportPdfComptrollerReportingSuccess, (state, { payload }) => {
    const pdf = payload; 
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Composición accionaria (Contraloria distrital) " + fechaFormateada + ".pdf";

    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { ...state, isLoading: false };
  }),
  on(exportPdfComptrollerReportingError, (state) => {
    return { ...state, isLoading: false }
  }),


  // libro de acionistas
  
  on(exportPdfShareholderBook, (state) => ({ ...state, isLoading: true })),
  on(exportPdfShareholderBookSuccess, (state, { payload }) => {
    const pdfContent = payload;
    const pdf = payload; 
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

 
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Reporte de libro de accionistas  " + fechaFormateada + ".pdf";


    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { ...state, isLoading: false };
  }),
  on(exportPdfShareholderBookError, (state) => {
    return { ...state, isLoading: false }
  }),


  // informe super sociedades

  on(exportPdfSuperSocietiesReport, (state) => ({ ...state, isLoading: true })),
  on(exportPdfSuperSocietiesReportSuccess, (state, { payload }) => {
    const pdfContent = payload;
    const pdf = payload; 
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

 
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Reporte de listado de accionistas superSociedades  " + fechaFormateada + ".pdf";


    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { ...state, isLoading: false };
  }),
  on(exportPdfSuperSocietiesReportError, (state) => {
    return { ...state, isLoading: false }
  }),


  // reporte dian

  on(exportPdfReportDian, (state) => ({ ...state, isLoading: true })),
  on(exportPdfReportDianSuccess, (state, { payload }) => {
    const pdfContent = payload;
    const pdf = payload; 
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

 
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Resumen de acciones  " + fechaFormateada + ".pdf";


    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { ...state, isLoading: false };
  }),
  on(exportPdfReportDianError, (state) => {
    return { ...state, isLoading: false }
  }),


  // reporte de votaciones

  on(exportPdfBallotReport, (state) => ({ ...state, isLoading: true })),
  on(exportPdfSuperBallotReportSuccess, (state, { payload }) => {
    const pdfContent = payload;
    const pdf = payload; 
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

 
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Reporte de votaciones " + fechaFormateada + ".pdf";


    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { ...state, isLoading: false };
  }),
  on(exportPdfSuperBallotReportError, (state) => {
    return { ...state, isLoading: false }
  }),


// impresion de tarjetones

  on(exportPdfPrintingCards, (state) => ({ ...state, isLoading: true })),
  on(exportPdfPrintingCardsSuccess, (state, { payload }) => {
    const pdfContent = payload;
    const pdf = payload; 
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

 
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Tarjetones " + fechaFormateada + ".pdf";


    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { ...state, isLoading: false };
  }),
  on(exportPdfPrintingCardsError, (state) => {
    return { ...state, isLoading: false }
  }),


// registro libro de accionistas

  on(exportExcelShareholderLedgerRegister, (state) => ({ ...state, isLoading: true })),
  on(exportExcelShareholderLedgerRegisterSuccess, (state, { payload }) => {
    const blob = new Blob([payload], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = fechaActual.getMonth() + 1;
  const day = fechaActual.getDate();
  const hours = fechaActual.getHours();
  const minutes = fechaActual.getMinutes();
  const seconds = fechaActual.getSeconds();
  const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
  let fileName = "Registro libro de accionistas " + fechaFormateada;

  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return { ...state, isLoading: false };
  }),
  on(exportExcelShareholderLedgerRegisterError, (state) => {
    return { ...state, isLoading: false }
  }),


// certificado de accionistas

on(exportPdfShareholderCertificate, (state) => ({ ...state, isLoading: true })),
on(exportPdfShareholderCertificateSuccess, (state, { payload }) => {
  const pdfContent = payload;
  const pdf = payload; 
  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);


  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = fechaActual.getMonth() + 1;
  const day = fechaActual.getDate();
  const hours = fechaActual.getHours();
  const minutes = fechaActual.getMinutes();
  const seconds = fechaActual.getSeconds();
  const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
  let fileName = "Certificado de accionistas " + fechaFormateada + ".pdf";


  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return { ...state, isLoading: false };
}),
on(exportPdfShareholderCertificateError, (state) => {
  return { ...state, isLoading: false }
}),


// Reporte embargos por accionista

on(exportPdfSeizureShareholder, (state) => ({ ...state, isLoading: true })),
on(exportPdfSeizureShareholderSuccess, (state, { payload }) => {
  const pdfContent = payload;
  const pdf = payload; 
  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);


  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = fechaActual.getMonth() + 1;
  const day = fechaActual.getDate();
  const hours = fechaActual.getHours();
  const minutes = fechaActual.getMinutes();
  const seconds = fechaActual.getSeconds();
  const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
  let fileName = "Embargos por accionista " + fechaFormateada + ".pdf";


  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return { ...state, isLoading: false };
}),
on(exportPdfSeizureShareholderError, (state) => {
  return { ...state, isLoading: false }
}),


// Reporte garantias por accionista

on(exportPdfWarrantyShareholder, (state) => ({ ...state, isLoading: true })),
on(exportPdfWarrantyShareholderSuccess, (state, { payload }) => {
  const pdfContent = payload;
  const pdf = payload; 
  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);


  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = fechaActual.getMonth() + 1;
  const day = fechaActual.getDate();
  const hours = fechaActual.getHours();
  const minutes = fechaActual.getMinutes();
  const seconds = fechaActual.getSeconds();
  const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
  let fileName = "Garantias por accionista " + fechaFormateada + ".pdf";


  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return { ...state, isLoading: false };
}),
on(exportPdfWarrantyShareholderError, (state) => {
  return { ...state, isLoading: false }
}),


// Imprimir titulo

on(exportPdfTitleShareholder, (state) => ({ ...state, isLoading: true })),
on(exportPdfTitleShareholderSuccess, (state, { payload }) => {
  const pdfContent = payload;
  const pdf = payload; 
  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);


  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = fechaActual.getMonth() + 1;
  const day = fechaActual.getDate();
  const hours = fechaActual.getHours();
  const minutes = fechaActual.getMinutes();
  const seconds = fechaActual.getSeconds();
  const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
  let fileName = "Titulo Impreso " + fechaFormateada + ".pdf";


  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return { ...state, isLoading: false };
}),
on(exportPdfTitleShareholderError, (state) => {
  return { ...state, isLoading: false }
}),


// Liquidacion y pagos

on(exportPdfSettlementpayment, (state) => ({ ...state, isLoading: true })),
on(exportPdfSettlementpaymentSuccess, (state, { payload }) => {
  const pdfContent = payload;
  const pdf = payload; 
  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);


  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = fechaActual.getMonth() + 1;
  const day = fechaActual.getDate();
  const hours = fechaActual.getHours();
  const minutes = fechaActual.getMinutes();
  const seconds = fechaActual.getSeconds();
  const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
  let fileName = "Reporte liquidación y pago de dividendos " + fechaFormateada + ".pdf";


  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return { ...state, isLoading: false };
}),
on(exportPdfSettlementpaymentError, (state) => {
  return { ...state, isLoading: false }
}),


// Reporte de consulta de pagos

on(exportExcelPaymentQuery, (state) => ({ ...state, isLoading: true })),
on(exportExcelPaymentQuerySuccess, (state, { payload }) => {
  const blob = new Blob([payload], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);

const fechaActual = new Date();
const year = fechaActual.getFullYear();
const month = fechaActual.getMonth() + 1;
const day = fechaActual.getDate();
const hours = fechaActual.getHours();
const minutes = fechaActual.getMinutes();
const seconds = fechaActual.getSeconds();
const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
let fileName = "Reporte consulta de pagos  " + fechaFormateada;

const link = document.createElement('a');
link.download = fileName;
link.href = url;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
return { ...state, isLoading: false };
}),
on(exportExcelPaymentQueryError, (state) => {
  return { ...state, isLoading: false }
}),
on(exportCsvPaymentQuery, (state) => ({ ...state, isLoading: true })),
on(exportCsvPaymentQuerySuccess, (state, { payload }) => {
const csv = payload; 
const blob = new Blob([csv], { type: 'text/csv' });
const url = window.URL.createObjectURL(blob);

const fechaActual = new Date();
const year = fechaActual.getFullYear();
const month = fechaActual.getMonth() + 1;
const day = fechaActual.getDate();
const hours = fechaActual.getHours();
const minutes = fechaActual.getMinutes();
const seconds = fechaActual.getSeconds();
const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
let fileName = "Reporte consulta de pagos  " + fechaFormateada + ".csv";

const link = document.createElement('a');
link.download = fileName;
link.href = url;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
return { ...state, isLoading: false };
}),
on(exportCsvPaymentQueryError, (state) => {
  return { ...state, isLoading: false }
}),
on(exportPdfPaymentQuery, (state) => ({ ...state, isLoading: true })),
on(exportPdfPaymentQuerySuccess, (state, { payload }) => {
const pdf = payload; 
const blob = new Blob([pdf], { type: 'application/pdf' });
const url = window.URL.createObjectURL(blob);

const fechaActual = new Date();
const year = fechaActual.getFullYear();
const month = fechaActual.getMonth() + 1;
const day = fechaActual.getDate();
const hours = fechaActual.getHours();
const minutes = fechaActual.getMinutes();
const seconds = fechaActual.getSeconds();
const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
let fileName = "Reporte consulta de pagos  " + fechaFormateada + ".pdf";

const link = document.createElement('a');
link.download = fileName;
link.href = url;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
return { ...state, isLoading: false };
}),
on(exportPdfPaymentQueryError, (state) => {
  return { ...state, isLoading: false }
}),

  on(UpdateStateReports, (state) => ({ ...state, status: undefined, isLoading: false }))

)
