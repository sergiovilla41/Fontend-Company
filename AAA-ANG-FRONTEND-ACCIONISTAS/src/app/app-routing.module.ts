import { RouterModule, Routes } from "@angular/router";

import { AssemblyComponent } from "./pages/assembly/assembly.component";
import { AuthGuard } from "./guards/auth.guard";
import { ComptrollerReportingComponent } from "./pages/reports/reportsShareholder/comptrollerReporting/comptrollerReporting.component";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { DataTreatmentComponent } from "./pages/legals/dataTreatment/dataTreatment.component";
import { ForgotPasswordComponent } from "./pages/forgotPassword/forgotPassword.component";
import { LoginComponent } from "./pages/login/login.component";
import { NgModule } from "@angular/core";
import { PaymentComponent } from "./pages/payment/payment.component";
import { PaymentQueryComponent } from "./pages/reports/reportsSettlementPaymen/paymentQuery/paymentQuery.component";
import { PrintingCardsComponent } from "./pages/reports/reportsAssembly/printingCards/printingCards.component";
import { ReportBallotComponent } from "./pages/reports/reportsAssembly/reportBallot/reportBallot.component";
import { ReportDianComponent } from "./pages/reports/reportsShareholder/reportDian/reportDian.component";
import { ReportsAssemblyComponent } from "./pages/reports/reportsAssembly/reportsAssembly.component";
import { ReportsComponent } from "./pages/reports/reports.component";
import { ReportsShareholderComponent } from "./pages/reports/reportsShareholder/reportsShareholder.component";
import { SeizureComponent } from "./pages/Seizure/Seizure.component";
import { SeizureShareholderComponent } from "./pages/reports/titlesReport/seizureShareholder/seizureShareholder.component";
import { SettlementPaymentComponent } from "./pages/reports/reportsSettlementPaymen/settlementPayment/settlementPayment.component";
import { ShareholderCertificateComponent } from "./pages/reports/titlesReport/ShareholderCertificate/ShareholderCertificate.component";
import { ShareholderLedgerRegisterComponent } from "./pages/reports/titlesReport/shareholderLedgerRegister/shareholderLedgerRegister.component";
import { ShareholdersBookComponent } from "./pages/reports/reportsShareholder/shareholdersBook/shareholdersBook.component";
import { ShareholdersComponent } from "./pages/shareholders/shareholders.component";
import { ShareholdresFormComponent } from "./pages/shareholders/shareholdresForm/shareholdresForm.component";
import { SuperSocietiesReportComponent } from "./pages/reports/reportsShareholder/SuperSocietiesReport/SuperSocietiesReport.component";
import { TermsConditionsUseComponent } from "./pages/legals/termsConditionsUse/termsConditionsUse.component";
import { TitleShareholderComponent } from "./pages/reports/titlesReport/titleShareholder/titleShareholder.component";
import { TitlesComponent } from "./pages/titles/titles.component";
import { TitlesReportComponent } from "./pages/reports/titlesReport/titlesReport.component";
import { TraceabilityComponent } from "./pages/traceability/traceability.component";
import { TrasladosComponent } from "./pages/traslados/traslados.component";
import { UsersComponent } from "./pages/users/users.component";
import { UsersFormComponent } from "./pages/users/usersForm/usersForm.component";
import { WarrantyComponent } from "./pages/warranty/warranty.component";
import { WarrantyShareholderComponent } from "./pages/reports/titlesReport/warrantyShareholder/warrantyShareholder.component";
import { reportsSettlementPaymenComponent } from "./pages/reports/reportsSettlementPaymen/reportsSettlementPaymen.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "forgotPassword",
    component: ForgotPasswordComponent,
  },
  {
    path: "",
    component: CustomLayoutComponent,
    children: [
      {
        path: "users",
        component: UsersComponent,
      },
      {
        path: "userManage/:state/:id",
        component: UsersFormComponent,
      },
      {
        path: "shareholder",
        component: ShareholdersComponent,
      },
      {
        path: "shareholderManage/:state/:id",
        component: ShareholdresFormComponent,
      },
      {
        path: "Administraciontitulos",
        component: TitlesComponent,
      },
      {
        path: "asamblea",
        component: AssemblyComponent,
      },
      {
        path: "trazabilidad",
        component: TraceabilityComponent,
      },
      {
        path: "traslados",
        component: TrasladosComponent,
      },
      {
        path: "embargos",
        component: SeizureComponent,
      },
      {
        path: "garantias",
        component: WarrantyComponent,
      },
      {
        path: "pagos",
        component: PaymentComponent,
      },
      {
        path: "reportes",
        component: ReportsComponent,
      },
      {
        path: "reportesAccionistas",
        component: ReportsShareholderComponent,
      },
      {
        path: "composicionAccionaria",
        component: ComptrollerReportingComponent,
      },
      {
        path: "libroAccionistas",
        component: ShareholdersBookComponent,
      },
      {
        path: "superSociedades",
        component: SuperSocietiesReportComponent,
      },
      {
        path: "reportesAsamblea",
        component: ReportsAssemblyComponent,
      },
      {
        path: "reporteVotaciones",
        component: ReportBallotComponent,
      },
      {
        path: "impresionTarjetones",
        component: PrintingCardsComponent,
      },
      {
        path: "reportesTitulos",
        component: TitlesReportComponent,
      },
      {
        path: "registroLibroAccionistas",
        component: ShareholderLedgerRegisterComponent,
      },
      {
        path: "certificadoAccionistas",
        component: ShareholderCertificateComponent,
      },
      {
        path: "resumenAcciones",
        component: ReportDianComponent,
      },
      {
        path: "embargosAccionistas",
        component: SeizureShareholderComponent,
      },
      {
        path: "garantiaAccionistas",
        component: WarrantyShareholderComponent,
      },
      {
        path: "imprimirTitulo",
        component: TitleShareholderComponent,
      },
      {
        path: "reportesLiquidacionPagos",
        component: reportsSettlementPaymenComponent,
      },
      {
        path: "liquidacionPagos",
        component: SettlementPaymentComponent,
      },
      {
        path: "consultaPagos",
        component: PaymentQueryComponent,
      },
      {
        path: "tratamientoDatos",
        component: DataTreatmentComponent,
      },
      {
        path: "terminosCondiciones",
        component: TermsConditionsUseComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
