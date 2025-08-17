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
import { MatTabsModule } from '@angular/material/tabs';
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { MatTableModule } from '@angular/material/table';

import { AnalyticsDashboardComponent } from './components/analytics-dashboard/analytics-dashboard.component';
import { NgChartsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";



@NgModule({
  declarations: [
   AdminDashboardComponent,
   AnalyticsDashboardComponent
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
    MatProgressBarModule,
    MatTabsModule,
    MatTableModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    
  ]
})
export class AdmindashboardModule { }
