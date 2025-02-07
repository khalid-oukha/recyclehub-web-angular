import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FrontOfficeRoutingModule} from './front-office-routing.module';
import {FrontOfficeComponent} from './front-office.component';
import {SharedModule} from "../../shared/shared.module";
import {ProfileComponent} from './pages/profile/profile.component';
import {HeroSectionComponent} from './pages/hero-section/hero-section.component';
import {CollectionRequestComponent} from './pages/collection-request/collection-request.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormCollectionRequestComponent} from './compoennts/form-collection-request/form-collection-request.component';
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";
import {RequestViewComponent} from './compoennts/request-view/request-view.component';


@NgModule({
  declarations: [
    FrontOfficeComponent,
    ProfileComponent,
    HeroSectionComponent,
    CollectionRequestComponent,
    FormCollectionRequestComponent,
    EditProfileComponent,
    RequestViewComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FrontOfficeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FrontOfficeModule {
}
