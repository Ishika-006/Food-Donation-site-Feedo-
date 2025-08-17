import { NgModule } from "@angular/core";
import { LoginRegisterComponent } from "./login-register.component";
import { DonorLoginComponent } from "./components/donor-login/donor-login.component";
import { NgoLoginComponent } from "./components/ngo-login/ngo-login.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatOptionModule } from "@angular/material/core";
import { CommonModule } from "@angular/common";
import { DeliveryLoginComponent } from './components/delivery-login/delivery-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';



@NgModule({
  declarations: [
    LoginRegisterComponent,
    DonorLoginComponent,
    NgoLoginComponent,
    DeliveryLoginComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,  
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    HttpClientModule
  ]
})
export class loginRegisterModule { }