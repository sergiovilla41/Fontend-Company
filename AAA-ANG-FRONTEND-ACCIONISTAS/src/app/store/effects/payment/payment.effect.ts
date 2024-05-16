import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { ResponseInterface } from "src/app/model/response.model";
import { ShareholdersService } from "src/app/services/shareholders/shareholders.service";
import { TitlesService } from "src/app/services/titles/titles.service";
import { exportCsvTitle, exportCsvTitleError, exportCsvTitleSuccess, exportExcelTitle, exportExcelTitleError, exportExcelTitleSuccess, exportPdfTitle, exportPdfTitleError, exportPdfTitleSuccess } from "../../actions/title.action";
import { deleteSeizure, deleteSeizureError, deleteSeizureSuccess, newSeizure, newSeizureError, newSeizureSuccess, updateSeizure, updateSeizureError, updateSeizureSuccess } from "../../actions/seizure.action";
import { SeizureService } from "src/app/services/seizure/seizure.service";
import { PaymentService } from "src/app/services/payment/payment.service";
import { deletePayment, deletePaymentError, deletePaymentSuccess, updatePayment, updatePaymentError, updatePaymentSuccess } from "../../actions/payment.action";


@Injectable()
export class PaymentEffect {
  constructor(private actions$: Actions, private seizureService: SeizureService, private paymentService: PaymentService) { }

  newSeizure$ = createEffect(() => this.actions$.pipe(
    ofType(newSeizure),
    mergeMap(({ seizure }) => this.seizureService.newSeizure(seizure)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return newSeizureSuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => {
          return [newSeizureError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

  updatePayment$ = createEffect(() => this.actions$.pipe(
    ofType(updatePayment),
    mergeMap(({ payment }) => this.paymentService.updatePayment(payment)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return updatePaymentSuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => {
          return [updatePaymentError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

  deletePayment$ = createEffect(() => this.actions$.pipe(
    ofType(deletePayment),
    mergeMap(({ payment }) => this.paymentService.deletePayment(payment)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return deletePaymentSuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => {
          return [deletePaymentError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));


}
