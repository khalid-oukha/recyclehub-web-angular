import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterLink} from "@angular/router";
import {LogoComponent} from "./components/logo/logo.component";
import {FooterComponent} from './components/footer/footer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    LogoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [HeaderComponent, FooterComponent, LogoComponent, FooterComponent]
})
export class SharedModule {
}
