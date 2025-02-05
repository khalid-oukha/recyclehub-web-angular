import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from "./auth.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AuthComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule
  ],
})
export class AuthModule {
}
