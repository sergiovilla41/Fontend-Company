import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withDisabledInitialNavigation,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MenuEffect } from './store/effects/menu/menu.effect';
import { menuReducer } from './store/reducers/menu/menu.reducer';
import { LoadingInterceptor } from './shared/interceptors/loading-interceptor';
import { regulatoryDatasetsReducer } from './store/reducers/regulatory-datasets/regulatory-datasets.reducer';
import { RegulatoryDatasetsEffect } from './store/effects/regulatory-datasets/regulatory-datasets.effect';
import {
  BrowserCacheLocation,
  BrowserUtils,
  IPublicClientApplication,
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { environment } from '../environments/environment';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { executionMonitoringReducer } from './store/reducers/execution-monitoring/execution-monitoring.reducer';
import { ExecutionMonitoringEffect } from './store/effects/execution-monitoring/execution-monitoring.effect';
import { DataSetEffect } from './store/effects/dataset/dataset.effect';
import { dataSetsReducer } from './store/reducers/dataSets/dataSets.reducer';
import { ColumnsEffect } from './store/effects/columns/columns.effect';
import { extractionsReducer } from './store/reducers/columns/extraction.reducer';
import { UserReducer } from './store/reducers/user/user.reducer';
import { UserEffect } from './store/effects/user/user.effect';
import { LabelsEffect } from './store/effects/labels/label.effect';
import { labelReducer } from './store/reducers/labels/labels.reducer';
import { regulatoryClassificationReducer } from './store/reducers/regulatory-classification/regulatory-classification.reducer';
import { RegulatoryClassificationEffect } from './store/effects/regulatory-classification/regulatory-classification.effect';
import { extractionReducer } from './store/reducers/extractions/extraction.reducer';
import { ExtractionEffect } from './store/effects/extractions/extraction.effect';
import { executionReducer } from './store/reducers/executions/execution.reducer';
import { ExecutionEffect } from './store/effects/executions/execution.effect';
import * as securityEffects from './store/effects/security/security.effect';
import { securityReducer } from './store/reducers/security/security.reducer';
import { publicationReducer } from './store/reducers/publications/publication.reducer';
import { PublicationEffect } from './store/effects/publications/publication.effect';
import { destinationColumnReducer } from './store/reducers/destination-column/destination.column.reducers';
import { DestinationColumnEffects } from './store/effects/destination-column/destination.column.effects';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId, // Application (client) ID from the app registration
      authority: environment.msalurl + environment.tenantId,
      redirectUri: '/home', // This is your redirect URI
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowNativeBroker: false,
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
    loginFailedRoute: './login',
  };
}

const initialNavigation =
  !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
    ? withEnabledBlockingInitialNavigation() // Set to enabledBlocking to use Angular Universal
    : withDisabledInitialNavigation();

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideRouter(routes, initialNavigation, withHashLocation()),
    provideClientHydration(),
    provideStore(),
    provideState({ name: 'extraction', reducer: extractionsReducer }),
    provideState({ name: 'menu', reducer: menuReducer }),
    provideState({ name: 'user', reducer: UserReducer }),
    provideState({
      name: 'regulatoryDatasets',
      reducer: regulatoryDatasetsReducer,
    }),
    provideState({
      name: 'executionMonitoring',
      reducer: executionMonitoringReducer,
    }),
    provideState({
      name: 'labels',
      reducer: labelReducer,
    }),
    provideState({ name: 'dataSets', reducer: dataSetsReducer }),
    provideState({ name: 'regulatoryClassification', reducer: regulatoryClassificationReducer }),
    provideState({ name: 'extractionInformation', reducer: extractionReducer }),
    provideState({ name: 'executionInformation', reducer: executionReducer }),
    provideState({ name: 'security', reducer: securityReducer }),
    provideState({ name: 'publicationInformation', reducer: publicationReducer }),
    provideState({ name: 'destinationColumn', reducer: destinationColumnReducer }),
    provideEffects([
      DataSetEffect,
      MenuEffect,
      RegulatoryDatasetsEffect,
      ExecutionMonitoringEffect,
      ColumnsEffect,
      UserEffect,
      LabelsEffect,
      RegulatoryClassificationEffect,
      ExtractionEffect,
      ExecutionEffect,
      securityEffects,
      PublicationEffect,
      DestinationColumnEffects,
    ]),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalGuard,
    MsalService,
    MsalBroadcastService,
  ],
};
