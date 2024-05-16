import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { ResponseInterface } from "src/app/model/response.model";
import { exportExcelComptrollerReporting, exportExcelComptrollerReportingSuccess, exportExcelComptrollerReportingError, exportCsvComptrollerReporting, exportCsvComptrollerReportingError, exportCsvComptrollerReportingSuccess, exportPdfComptrollerReporting, exportPdfComptrollerReportingError, exportPdfComptrollerReportingSuccess, exportPdfShareholderBook, exportPdfShareholderBookError, exportPdfShareholderBookSuccess, exportPdfSuperSocietiesReport, exportPdfSuperSocietiesReportError, exportPdfSuperSocietiesReportSuccess, exportPdfBallotReport, exportPdfSuperBallotReportSuccess, exportPdfSuperBallotReportError, exportPdfPrintingCards, exportPdfPrintingCardsSuccess, exportPdfPrintingCardsError, exportExcelShareholderLedgerRegisterSuccess, exportExcelShareholderLedgerRegisterError, exportExcelShareholderLedgerRegister, exportPdfShareholderCertificateSuccess, exportPdfShareholderCertificate, exportPdfShareholderCertificateError, exportPdfSeizureShareholder, exportPdfSeizureShareholderSuccess, exportPdfSeizureShareholderError, exportPdfWarrantyShareholder, exportPdfWarrantyShareholderSuccess, exportPdfWarrantyShareholderError, exportPdfTitleShareholder, exportPdfTitleShareholderSuccess, exportPdfTitleShareholderError, exportPdfSettlementpayment, exportPdfSettlementpaymentSuccess, exportPdfSettlementpaymentError, exportPdfPaymentQueryError, exportPdfPaymentQuerySuccess, exportPdfPaymentQuery, exportCsvPaymentQueryError, exportCsvPaymentQuerySuccess, exportCsvPaymentQuery, exportExcelPaymentQuerySuccess, exportExcelPaymentQuery, exportExcelPaymentQueryError, exportPdfReportDian, exportPdfReportDianError, exportPdfReportDianSuccess } from "../../actions/reports.action";
import { ReportsService } from "src/app/services/reports/reports.service";

@Injectable()
export class ReportsEffect {
  constructor(
    private actions$: Actions,
    private reportsService: ReportsService
  ) { }


  exportExcelComptrollerReporting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportExcelComptrollerReporting),
      mergeMap(({ paginador }) =>
        this.reportsService.exportExcelComptrollerShareholder(paginador).pipe(
          map((respuesta: ResponseInterface) => {
            return exportExcelComptrollerReportingSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportExcelComptrollerReportingError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  exportCsvComptrollerReporting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportCsvComptrollerReporting),
      mergeMap(({ paginador }) =>
        this.reportsService.exportCsvComptrollerShareholder(paginador).pipe(
          map((respuesta: ResponseInterface) => {
            return exportCsvComptrollerReportingSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportCsvComptrollerReportingError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  exportPdfComptrollerReporting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfComptrollerReporting),
      mergeMap(({ paginador }) =>
        this.reportsService.exportPdfComptrollerShareholder(paginador).pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfComptrollerReportingSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfComptrollerReportingError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  // libro de acionistas

  /*   exportPdfShareholderBook$ = createEffect(() =>
      this.actions$.pipe(
        ofType(exportPdfShareholderBook),
        mergeMap(({ paginador }) =>
          this.reportsService.exportPdfShareholderBook(paginador).pipe(
            map((respuesta: ResponseInterface) => {
              return exportPdfShareholderBookSuccess({ payload: respuesta });
            }),
            catchError((err: HttpErrorResponse) => {
              return [
                exportPdfShareholderBookError({ msg: err.error, status: err.status }),
              ];
            })
          )
        )
      )
    ); */
  exportPdfShareholderBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfShareholderBook),
      mergeMap(() =>
        this.reportsService.exportPdfShareholderBook().pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfShareholderBookSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfShareholderBookError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  // informe super sociedades

  exportPdfSuperSocietiesReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfSuperSocietiesReport),
      mergeMap(() =>
        this.reportsService.exportPdfSuperSocieties().pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfSuperSocietiesReportSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfSuperSocietiesReportError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

// reporte dian

exportPdfReportDian$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfReportDian),
      mergeMap(() =>
        this.reportsService.exportPdfReportDian().pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfReportDianSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfReportDianError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  // reporte de votaciones

  exportPdfBallotReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfBallotReport),
      mergeMap(({ id_registro }) =>
        this.reportsService.exportPdfBallot(id_registro).pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfSuperBallotReportSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfSuperBallotReportError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  // impresion de tarjetones

  exportPdfPrintingCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfPrintingCards),
      mergeMap(({ id_registro }) =>
        this.reportsService.exportPdfPrintingCards(id_registro).pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfPrintingCardsSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfPrintingCardsError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  // registro libro de accionistas

  exportExcelShareholderLedgerRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportExcelShareholderLedgerRegister),
      mergeMap(({ anio }) =>
        this.reportsService.exportExcelShareholderLedgerRegister(anio).pipe(
          map((respuesta: ResponseInterface) => {
            return exportExcelShareholderLedgerRegisterSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportExcelShareholderLedgerRegisterError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  // certificado de accionistas

  exportPdfShareholderCertificate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfShareholderCertificate),
      mergeMap(({ id_registro, atn, fecha_capital, fecha_intrinseco, valor_intrinseco }) =>
        this.reportsService.exportPdfShareholderCertificate(id_registro, atn, fecha_capital, fecha_intrinseco, valor_intrinseco).pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfShareholderCertificateSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfShareholderCertificateError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

// Reporte embargos por accionista

exportPdfSeizureShareholder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfSeizureShareholder),
      mergeMap(({ id_registro }) =>
        this.reportsService.exportPdfSeizureShareholder(id_registro).pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfSeizureShareholderSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfSeizureShareholderError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

// Reporte garantias por accionista

exportPdfWarrantyShareholder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfWarrantyShareholder),
      mergeMap(({ id_registro }) =>
        this.reportsService.exportPdfWarrantyShareholder(id_registro).pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfWarrantyShareholderSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfWarrantyShareholderError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );


// Imprimir titulo

exportPdfTitleShareholder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfTitleShareholder),
      mergeMap(({ acionista_uuid, titulo_uuid }) =>
        this.reportsService.exportPdfTitleShareholder(acionista_uuid, titulo_uuid ).pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfTitleShareholderSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfTitleShareholderError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );


// liquidacion y pagos

exportPdfSettlementpayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfSettlementpayment),
      mergeMap(({ acionista_uuid, anios }) =>
        this.reportsService.exportPdfSettlementPayment(acionista_uuid, anios ).pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfSettlementpaymentSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfSettlementpaymentError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );



  // Reporte consulta pagos


  // CON PAGINADOR
/* 
  exportExcelPaymentQuery$ = createEffect(() =>
  this.actions$.pipe(
    ofType(exportExcelPaymentQuery),
    mergeMap(({ paginador }) =>
      this.reportsService.exportExcelComptrollerShareholder(paginador).pipe(
        map((respuesta: ResponseInterface) => {
          return exportExcelPaymentQuerySuccess({ payload: respuesta });
        }),
        catchError((err: HttpErrorResponse) => {
          return [
            exportExcelPaymentQueryError({ msg: err.error, status: err.status }),
          ];
        })
      )
    )
  )
);

exportCsvPaymentQuery$ = createEffect(() =>
  this.actions$.pipe(
    ofType(exportCsvPaymentQuery),
    mergeMap(({ paginador }) =>
      this.reportsService.exportCsvComptrollerShareholder(paginador).pipe(
        map((respuesta: ResponseInterface) => {
          return exportCsvPaymentQuerySuccess({ payload: respuesta });
        }),
        catchError((err: HttpErrorResponse) => {
          return [
            exportCsvPaymentQueryError({ msg: err.error, status: err.status }),
          ];
        })
      )
    )
  )
);

exportPdfPaymentQuery$ = createEffect(() =>
  this.actions$.pipe(
    ofType(exportPdfPaymentQuery),
    mergeMap(({ paginador }) =>
      this.reportsService.exportPdfComptrollerShareholder(paginador).pipe(
        map((respuesta: ResponseInterface) => {
          return exportPdfPaymentQuerySuccess({ payload: respuesta });
        }),
        catchError((err: HttpErrorResponse) => {
          return [
            exportPdfPaymentQueryError({ msg: err.error, status: err.status }),
          ];
        })
      )
    )
  )
);

 */
  

// SIN PAGINADOR

  exportExcelPaymentQuery$ = createEffect(() =>
  this.actions$.pipe(
    ofType(exportExcelPaymentQuery),
    mergeMap(() =>
      this.reportsService.exportExcelPaymentQuery().pipe(
        map((respuesta: ResponseInterface) => {
          return exportExcelPaymentQuerySuccess({ payload: respuesta });
        }),
        catchError((err: HttpErrorResponse) => {
          return [
            exportExcelPaymentQueryError({ msg: err.error, status: err.status }),
          ];
        })
      )
    )
  )
);

exportCsvPaymentQuery$ = createEffect(() =>
  this.actions$.pipe(
    ofType(exportCsvPaymentQuery),
    mergeMap(() =>
      this.reportsService.exportCsvPaymentQuery().pipe(
        map((respuesta: ResponseInterface) => {
          return exportCsvPaymentQuerySuccess({ payload: respuesta });
        }),
        catchError((err: HttpErrorResponse) => {
          return [
            exportCsvPaymentQueryError({ msg: err.error, status: err.status }),
          ];
        })
      )
    )
  )
);

exportPdfPaymentQuery$ = createEffect(() =>
  this.actions$.pipe(
    ofType(exportPdfPaymentQuery),
    mergeMap(() =>
      this.reportsService.exportPdfPaymentQuery().pipe(
        map((respuesta: ResponseInterface) => {
          return exportPdfPaymentQuerySuccess({ payload: respuesta });
        }),
        catchError((err: HttpErrorResponse) => {
          return [
            exportPdfPaymentQueryError({ msg: err.error, status: err.status }),
          ];
        })
      )
    )
  )
);















}
