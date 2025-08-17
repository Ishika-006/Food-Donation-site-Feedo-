import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { loginRegisterModule } from './login-register/login-register.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomePageModule } from './home-page/home-page.module';
import { MatIconModule } from '@angular/material/icon';
import { DonordashboardModule } from './donor-dashboard/donor-dashboard.module';
import { NgoDashboardComponent } from './ngo-dashboard/ngo-dashboard.component';
import { NgoDashboardModule } from './ngo-dashboard/ngo-dashboard.module';
import { DeliveryDashboardComponent } from './delivery-dashboard/delivery-dashboard.component';
import { DeliverydashboardModule } from './delivery-dashboard/delivery-dashboard.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdmindashboardModule } from './admin-dashboard/admin-dashboard.module';
import { LiveMapComponent } from './live-map/live-map.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutUsModule } from './about-us/about-us.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactUsModule } from './contact-us/contact-us.module';
import { MatChipsModule } from '@angular/material/chips';
import { HowWorkComponent } from './how-work/how-work.component';
import { HowWorkModule } from './how-work/how-work.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackModule } from './feedback/feedback.module';

@NgModule({
  declarations: [
    AppComponent,
    LiveMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    loginRegisterModule,
    HomePageModule,
    DonordashboardModule,
    HttpClientModule,
    CommonModule,
    NgoDashboardModule,
    DeliverydashboardModule,
    AdmindashboardModule,
    AboutUsModule ,
    ContactUsModule,
    HomePageModule,
    MatChipsModule,  
    HowWorkModule,
    FeedbackModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
