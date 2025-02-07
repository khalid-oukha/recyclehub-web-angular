import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectorDashboardLayoutComponent} from "./collector-dashboard-layout.component";
import {CollectorDashboardComponent} from "./pages/collector-dashboard/collector-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: CollectorDashboardLayoutComponent,
    children: [
      {path: '', component: CollectorDashboardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule {
}
