import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiUrlInterceptor} from "./core/interceptors/api-url.interceptor";
import {SharedModule} from "./shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {userReducer} from "./store/user/user.reducer";
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./store/user/user.effects";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
