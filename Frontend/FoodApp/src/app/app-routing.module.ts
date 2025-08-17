import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminLoginComponent } from './login-register/components/admin-login/admin-login.component';
import { NgoLoginComponent } from './login-register/components/ngo-login/ngo-login.component';
import { DonorLoginComponent } from './login-register/components/donor-login/donor-login.component';
import { DeliveryLoginComponent } from './login-register/components/delivery-login/delivery-login.component';
import { DonorDashboardComponent } from './donor-dashboard/donor-dashboard.component';
import { DonateComponent } from './donor-dashboard/components/donate/donate.component';
import { SellComponent } from './donor-dashboard/components/sell/sell.component';
import { ContributionComponent } from './donor-dashboard/components/contribution/contribution.component';
import { NgoDashboardComponent } from './ngo-dashboard/ngo-dashboard.component';
import { DeliveryDashboardComponent } from './delivery-dashboard/delivery-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LiveMapComponent } from './live-map/live-map.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HowWorkComponent } from './how-work/how-work.component';
import { FeedbackComponent } from './feedback/feedback.component';

// const routes: Routes = [
//   { path: 'loginRegister', component: LoginRegisterComponent },  
//   { path: 'Home', component: HomePageComponent },
// ];
// const routes: Routes = [
//   { path: 'donor', component: DonorDashboardComponent },
//   { path: 'home', component: HomePageComponent },
//   { path: 'admin-login', component: AdminLoginComponent },
//   { path: 'ngo-login', component: NgoLoginComponent },
//   { path: 'donor-login', component: DonorLoginComponent },
//   { path: 'delivery-login', component: DeliveryLoginComponent }
// ];
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'donor-dashboard', component: DonorDashboardComponent },
  { path: 'ngo-dashboard', component: NgoDashboardComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'sell', component: SellComponent },
  { path: 'contribution', component: ContributionComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'ngo-login', component: NgoLoginComponent },
  { path: 'donor-login', component: DonorLoginComponent },
  { path: 'delivery-login', component: DeliveryLoginComponent },
  { path: 'delivery-dashboard', component: DeliveryDashboardComponent },
  { path: 'track', component: LiveMapComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'how-work', component: HowWorkComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: '**', redirectTo: 'home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
