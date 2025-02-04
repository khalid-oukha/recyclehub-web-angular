import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FrontOfficeComponent} from "./front-office.component";
import {HeroSectionComponent} from "./hero-section/hero-section.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path: '', component: FrontOfficeComponent, children: [
      {path: 'home', component: HeroSectionComponent},
      {path: 'profile', component: ProfileComponent},
      {path: '**', redirectTo: 'home', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule {
}
