import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FrontOfficeRoutingModule} from './front-office-routing.module';
import {FrontOfficeComponent} from './front-office.component';
import {SharedModule} from "../../shared/shared.module";
import { ProfileComponent } from './profile/profile.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';


@NgModule({
  declarations: [
    FrontOfficeComponent,
    ProfileComponent,
    HeroSectionComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    SharedModule
  ]
})
export class FrontOfficeModule {
}
