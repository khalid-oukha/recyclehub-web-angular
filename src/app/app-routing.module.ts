import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";
import {isLoggedInGuard} from "./core/guards/isLogged-in.guard";

const routes: Routes = [
  {
    path: 'collector',
    loadChildren: () => import('./modules/back-office/back-office.module').then(m => m.BackOfficeModule)
    , canMatch: [authGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    , canMatch: [isLoggedInGuard]
  },

  {
    path: '',
    loadChildren: () => import('./modules/front-office/front-office.module').then(m => m.FrontOfficeModule)
    , canMatch: [authGuard]
  },


  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
