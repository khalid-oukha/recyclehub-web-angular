import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FrontOfficeComponent} from "./front-office.component";
import {HeroSectionComponent} from "./pages/hero-section/hero-section.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {CollectionRequestComponent} from "./pages/collection-request/collection-request.component";
import {FormCollectionRequestComponent} from "./compoennts/form-collection-request/form-collection-request.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";
import {RequestViewComponent} from "./compoennts/request-view/request-view.component";

const routes: Routes = [
  {
    path: '',
    component: FrontOfficeComponent,
    children: [
      {
        path: 'home',
        component: HeroSectionComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent
      },
      {
        path: 'request',
        component: CollectionRequestComponent,
        children: [
          {
            path: '',
            component: FormCollectionRequestComponent
          },
          {
            path: 'view',
            component: RequestViewComponent,
          }
        ]
      },
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule {
}
