import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterLink} from "@angular/router";
import {LogoComponent} from "./components/logo/logo.component";
import {FooterComponent} from './components/footer/footer.component';
import {ActionMenuComponent} from './components/action-menu/action-menu.component';
import {CollectorHeaderComponent} from './components/collector-header/collector-header.component';
import {CollectorSideBarComponent} from './components/collector-side-bar/collector-side-bar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    ActionMenuComponent,
    CollectorHeaderComponent,
    CollectorSideBarComponent,
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [HeaderComponent, LogoComponent, FooterComponent, ActionMenuComponent, CollectorHeaderComponent, CollectorSideBarComponent]
})
export class SharedModule {
}
