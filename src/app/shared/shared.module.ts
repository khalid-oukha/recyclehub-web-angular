import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterLink} from "@angular/router";
import {LogoComponent} from "./components/logo/logo.component";
import {FooterComponent} from './components/footer/footer.component';
import {ActionMenuComponent} from './components/action-menu/action-menu.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    ActionMenuComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [HeaderComponent, FooterComponent, LogoComponent, ActionMenuComponent]
})
export class SharedModule {
}
