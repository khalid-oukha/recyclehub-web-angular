import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BackOfficeRoutingModule} from './back-office-routing.module';
import {CollectorDashboardComponent} from './pages/collector-dashboard/collector-dashboard.component';
import {CollectorDashboardLayoutComponent} from './collector-dashboard-layout.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        CollectorDashboardComponent,
        CollectorDashboardLayoutComponent
    ],
    imports: [
        CommonModule,
        BackOfficeRoutingModule,
        SharedModule,
        FormsModule
    ],
})
export class BackOfficeModule {
}
