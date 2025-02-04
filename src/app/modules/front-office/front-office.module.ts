import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FrontOfficeRoutingModule} from './front-office-routing.module';
import {FrontOfficeComponent} from './front-office.component';
import {SharedModule} from "../../shared/shared.module";
import {ProfileComponent} from './pages/profile/profile.component';
import {HeroSectionComponent} from './pages/hero-section/hero-section.component';
import {CollectionRequestComponent} from './pages/collection-request/collection-request.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FormCollectionRequestComponent } from './compoennts/form-collection-request/form-collection-request.component';


@NgModule({
  declarations: [
    FrontOfficeComponent,
    ProfileComponent,
    HeroSectionComponent,
    CollectionRequestComponent,
    FormCollectionRequestComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FrontOfficeModule {
}
