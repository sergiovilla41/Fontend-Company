import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule, isDevMode } from "@angular/core";

import { AccordionModule } from "primeng/accordion";
import { AccountTypeEffect } from "./store/effects/tablesTypes/accountType.effect";
import { AddAssemblyModule } from "./components/add-assembly/add-assembly.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AsistenciaEffect } from "./store/effects/asistencia/asistencia.effect";
import { AssemblyComponent } from "./pages/assembly/assembly.component";
import { AssemblyEffect } from "./store/effects/assembly/assembly.effect";
import { BanckEffect } from "./store/effects/tablesTypes/bank.effect";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CancelTitleComponent } from "./pages/titles/cancelTitle/cancelTitle.component";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { ChipsModule } from "primeng/chips";
import { CityEffect } from "./store/effects/tablesTypes/city.effect";
import { CommonModule } from "@angular/common";
import { ComptrollerReportingComponent } from "./pages/reports/reportsShareholder/comptrollerReporting/comptrollerReporting.component";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmationService } from "primeng/api";
import { CountryEffect } from "./store/effects/tablesTypes/country.effect";
import { CustomLayoutModule } from "./custom-layout/custom-layout.module";
import { DataTreatmentComponent } from "./pages/legals/dataTreatment/dataTreatment.component";
import { DepartmentEffect } from "./store/effects/tablesTypes/department.effect";
import { DialogModule } from "primeng/dialog";
import { DividendoEffect } from "./store/effects/dividendo/dividendo.effect";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { EditAssemblyModule } from "./components/edit-assembly/edit-assembly.module";
import { EffectsModule } from "@ngrx/effects";
import { FileUploadModule } from "primeng/fileupload";
import { ForgotPasswordComponent } from "./pages/forgotPassword/forgotPassword.component";
import { HttpErrorInterceptor } from "./interceptor/http-error.interceptor";
import { HttpInterceptorService } from "./interceptor/request.interceptor";
import { InplaceModule } from "primeng/inplace";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { LiquidacionEffect } from "./store/effects/liquidacion/liquidacion.effect";
import { LoginComponent } from "./pages/login/login.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRippleModule } from "@angular/material/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatTableModule } from "@angular/material/table";
import { NacionalityTypeEffect } from "./store/effects/tablesTypes/nacionalityType.effect";
import { PasswordModule } from "primeng/password";
import { PaymentComponent } from "./pages/payment/payment.component";
import { PaymentEffect } from "./store/effects/payment/payment.effect";
import { PaymentFormComponent } from "./pages/payment/paymentForm/paymentForm.component";
import { PaymentQueryComponent } from "./pages/reports/reportsSettlementPaymen/paymentQuery/paymentQuery.component";
import { PersonTypeEffect } from "./store/effects/tablesTypes/personType.effect";
import { PrintingCardsComponent } from "./pages/reports/reportsAssembly/printingCards/printingCards.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ReportBallotComponent } from "./pages/reports/reportsAssembly/reportBallot/reportBallot.component";
import { ReportDianComponent } from "./pages/reports/reportsShareholder/reportDian/reportDian.component";
import { ReportsAssemblyComponent } from "./pages/reports/reportsAssembly/reportsAssembly.component";
import { ReportsComponent } from "./pages/reports/reports.component";
import { ReportsEffect } from "./store/effects/reports/reports.effect";
import { ReportsShareholderComponent } from "./pages/reports/reportsShareholder/reportsShareholder.component";
import { RolDirective } from "./directive/rol.directive";
import { RolEffect } from "./store/effects/rol/rol.effect";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SeizureComponent } from "./pages/Seizure/Seizure.component";
import { SeizureEffect } from "./store/effects/seizure/seizure.effect";
import { SeizureFormComponent } from "./pages/Seizure/seizureForm/seizureForm/seizureForm.component";
import { SeizureShareholderComponent } from "./pages/reports/titlesReport/seizureShareholder/seizureShareholder.component";
import { SettlementPaymentComponent } from "./pages/reports/reportsSettlementPaymen/settlementPayment/settlementPayment.component";
import { ShareholderCertificateComponent } from "./pages/reports/titlesReport/ShareholderCertificate/ShareholderCertificate.component";
import { ShareholderEffect } from "./store/effects/shareholder/shareholder.effect";
import { ShareholderLedgerRegisterComponent } from "./pages/reports/titlesReport/shareholderLedgerRegister/shareholderLedgerRegister.component";
import { ShareholderTypeEffect } from "./store/effects/tablesTypes/shareholderType.effect";
import { ShareholdersBookComponent } from "./pages/reports/reportsShareholder/shareholdersBook/shareholdersBook.component";
import { ShareholdersComponent } from "./pages/shareholders/shareholders.component";
import { ShareholdresFormComponent } from "./pages/shareholders/shareholdresForm/shareholdresForm.component";
import { SkeletonModule } from "primeng/skeleton";
import { SplitterModule } from "primeng/splitter";
import { StateEffect } from "./store/effects/tablesTypes/stateTrue.effect";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { SuperSocietiesReportComponent } from "./pages/reports/reportsShareholder/SuperSocietiesReport/SuperSocietiesReport.component";
import { TableModule } from "primeng/table";
import { TermsConditionsUseComponent } from "./pages/legals/termsConditionsUse/termsConditionsUse.component";
import { TitleEffect } from "./store/effects/title/title.effect";
import { TitleShareholderComponent } from "./pages/reports/titlesReport/titleShareholder/titleShareholder.component";
import { TitlesComponent } from "./pages/titles/titles.component";
import { TitlesFormComponent } from "./pages/titles/titlesForm/titlesForm.component";
import { TitlesReportComponent } from "./pages/reports/titlesReport/titlesReport.component";
import { TokenInterceptor } from "./interceptor/token.interceptor";
import { TooltipModule } from "primeng/tooltip";
import { TraceabilityComponent } from "./pages/traceability/traceability.component";
import { TrasladoEffect } from "./store/effects/traslado/traslado.effect";
import { TrasladosModule } from "./pages/traslados/traslados.module";
import { TypeOfFilerEffect } from "./store/effects/tablesTypes/typeOfFiler.effect";
import { TypeSourceEffect } from "./store/effects/tablesTypes/TypeSource.effect";
import { UserEffect } from "./store/effects/user/user.effect";
import { UsersComponent } from "./pages/users/users.component";
import { UsersFormComponent } from "./pages/users/usersForm/usersForm.component";
import { UsersListEffect } from "./store/effects/user/usersList.effect";
import { VexModule } from "../@vex/vex.module";
import { VotacionEffect } from "./store/effects/votacion/votacion.effect";
import { WarrantyComponent } from "./pages/warranty/warranty.component";
import { WarrantyEffect } from "./store/effects/warranty/warranty.effect";
import { WarrantyFormComponent } from "./pages/warranty/warrantyForm/warrantyForm/warrantyForm.component";
import { WarrantyShareholderComponent } from "./pages/reports/titlesReport/warrantyShareholder/warrantyShareholder.component";
import { accountTypeListReducer } from "./store/reducers/tablesTypes/accountType.reducer";
import { asistenciaReducer } from "./store/reducers/asistencias/asistencias.reducer";
import { assemblyReducer } from "./store/reducers/Assembly/assembly.reducer";
import { bankListReducer } from "./store/reducers/tablesTypes/bank.reducer";
import { cityReducer } from "./store/reducers/tablesTypes/city.reducer";
import { countryReducer } from "./store/reducers/tablesTypes/country.reducer";
import { departmentReducer } from "./store/reducers/tablesTypes/department.reducer";
import { dividendoReducer } from "./store/reducers/dividendo/dividendo.reducer";
import { forgotPasswordEffect } from "./store/effects/forgotPassword/forgotPassword.effect";
import { forgotPasswordReducer } from "./store/reducers/forgotPassword/forgotPassword.reducer";
import { identificationTypeEffect } from "./store/effects/tablesTypes/identificationType.effect";
import { identificationTypeReducer } from "./store/reducers/tablesTypes/identificationType.reducer";
import { liquidacionReducer } from "./store/reducers/liquidacion/liquidacion.reducer";
import { nacionalityTypeListReducer } from "./store/reducers/tablesTypes/nacionalityType.reducer";
import { paymentReducer } from "./store/reducers/payment/payment.reducer";
import { personTypeReducer } from "./store/reducers/tablesTypes/personType.reducer";
import { reportsReducer } from "./store/reducers/reports/reports.reducer";
import { reportsSettlementPaymenComponent } from "./pages/reports/reportsSettlementPaymen/reportsSettlementPaymen.component";
import { rolReducer } from "./store/reducers/rol/rol.reducer";
import { seizureReducer } from "./store/reducers/seizure/seizure.reducer";
import { shareholderReducer } from "./store/reducers/shareholder/shareholder.reducer";
import { shareholderTypeReducer } from "./store/reducers/tablesTypes/shareholderType.reducer";
import { stateReducer } from "./store/reducers/tablesTypes/state.reducer";
import { titleReducer } from "./store/reducers/title/title.reducer";
import { trasladoReducer } from "./store/reducers/traslado/traslado.reducer";
import { typeOfFilerListReducer } from "./store/reducers/tablesTypes/typeOfFiler.reducer";
import { typeSourceReducer } from "./store/reducers/tablesTypes/TypeSource.reducer";
import { userReducer } from "./store/reducers/user/user.reducer";
import { usersListReducer } from "./store/reducers/user/usersList.reducer";
import { votacionReducer } from "./store/reducers/votacion/votacion.reducer";
import { warrantyReducer } from "./store/reducers/warranty/warranty.reducer";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    UsersComponent,
    UsersFormComponent,
    RolDirective,
    ShareholdersComponent,
    ShareholdresFormComponent,
    TraceabilityComponent,
    TitlesComponent,
    AssemblyComponent,
    TitlesFormComponent,
    CancelTitleComponent,
    SeizureComponent,
    SeizureFormComponent,
    WarrantyComponent,
    WarrantyFormComponent,
    PaymentComponent,
    PaymentFormComponent,
    ReportsComponent,
    ReportsShareholderComponent,
    ComptrollerReportingComponent,
    ShareholdersBookComponent,
    SuperSocietiesReportComponent,
    ReportsAssemblyComponent,
    ReportBallotComponent,
    PrintingCardsComponent,
    TitlesReportComponent,
    ShareholderLedgerRegisterComponent,
    ShareholderCertificateComponent,
    SeizureShareholderComponent,
    WarrantyShareholderComponent,
    TitleShareholderComponent,
    reportsSettlementPaymenComponent,
    SettlementPaymentComponent,
    PaymentQueryComponent,
    ReportDianComponent,
    DataTreatmentComponent,
    TermsConditionsUseComponent,
  ],
  imports: [
    SplitterModule,
    CardModule,
    ScrollPanelModule,
    InplaceModule,
    FileUploadModule,
    ProgressSpinnerModule,
    TrasladosModule,
    AddAssemblyModule,
    EditAssemblyModule,
    DynamicDialogModule,
    InputTextareaModule,
    DividerModule,
    ChipsModule,
    InputNumberModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    TooltipModule,
    CalendarModule,
    SkeletonModule,
    ConfirmPopupModule,
    DropdownModule,
    FormsModule,
    PasswordModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule,
    AccordionModule,
    MatProgressBarModule,
    StoreModule.forRoot({
      userState: userReducer,
      usersList: usersListReducer,
      forgotPasswordState: forgotPasswordReducer,
      rolList: rolReducer,
      personTypeList: personTypeReducer,
      shareholderTypeList: shareholderTypeReducer,
      typeOfFilerList: typeOfFilerListReducer,
      identificationTypeList: identificationTypeReducer,
      bankList: bankListReducer,
      accountTypeList: accountTypeListReducer,
      nacionalityTypeList: nacionalityTypeListReducer,
      state: stateReducer,
      country: countryReducer,
      department: departmentReducer,
      city: cityReducer,
      titleState: titleReducer,
      shareholderList: shareholderReducer,
      assemblystate: assemblyReducer,
      traslados: trasladoReducer,
      votacion: votacionReducer,
      asistencia: asistenciaReducer,
      liquidacion: liquidacionReducer,
      typeSourceList: typeSourceReducer,
      seizureList: seizureReducer,
      warrantyList: warrantyReducer,
      paymentList: paymentReducer,
      dividendo: dividendoReducer,
      reportState: reportsReducer,
    }),
    EffectsModule.forRoot([
      UserEffect,
      UsersListEffect,
      forgotPasswordEffect,
      RolEffect,
      PersonTypeEffect,
      ShareholderTypeEffect,
      TypeOfFilerEffect,
      identificationTypeEffect,
      BanckEffect,
      AccountTypeEffect,
      NacionalityTypeEffect,
      ShareholderEffect,
      StateEffect,
      CountryEffect,
      DepartmentEffect,
      CityEffect,
      TitleEffect,
      AssemblyEffect,
      TrasladoEffect,
      VotacionEffect,
      AsistenciaEffect,
      LiquidacionEffect,
      TypeSourceEffect,
      SeizureEffect,
      WarrantyEffect,
      PaymentEffect,
      DividendoEffect,
      ReportsEffect,
    ]),
    StoreDevtoolsModule,
    VexModule,
    CustomLayoutModule,
    MatTableModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    DynamicDialogRef,
    TitlesComponent,
    DialogService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
