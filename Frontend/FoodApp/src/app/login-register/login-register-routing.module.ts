// login-register-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DonorLoginComponent } from './components/donor-login/donor-login.component';
import { NgoLoginComponent } from './components/ngo-login/ngo-login.component';
import { DeliveryLoginComponent } from './components/delivery-login/delivery-login.component';
import { DonorDashboardComponent } from '../donor-dashboard/donor-dashboard.component';


const routes: Routes = [
  { path: 'donor-dashboard', component: DonorDashboardComponent },
  // { path: 'admin-login', component: AdminLoginComponent },
  // { path: 'donor-login', component: DonorLoginComponent },
  // { path: 'ngo-login', component: NgoLoginComponent },
  // { path: 'delivery-login', component: DeliveryLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRegisterRoutingModule { }
