import { isDevMode, NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing-module';
import { App } from './app';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './auth/store/effect';
import { BackendErrorMessages } from './shared/components/backendErrorMessages/backend-error-messages/backend-error-messages';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore({
      router : routerReducer
    }),
    provideRouterStore(),
    provideState(authFeatureKey,authReducer),
    provideEffects(authEffects),
    provideStoreDevtools({
      maxAge : 25,
      logOnly:!isDevMode(),
      autoPause : true,
      trace : false,
      traceLimit : 75
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
