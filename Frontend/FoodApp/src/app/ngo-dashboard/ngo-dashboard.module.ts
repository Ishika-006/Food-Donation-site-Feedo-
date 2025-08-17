import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatOptionModule } from "@angular/material/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgoDashboardComponent } from "./ngo-dashboard.component";



@NgModule({
  declarations: [
    NgoDashboardComponent
  ],
  imports: [
    CommonModule,  
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatProgressBarModule
    
  ]
})
export class NgoDashboardModule { }