import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { EChartsOption } from 'echarts';
import { AdmindashboardService } from '../../service/admindashboard.service';


@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.css']
})
export class AnalyticsDashboardComponent implements OnInit {
    monthlyDonationData!: ChartConfiguration<'bar'>['data'];
    donationStatusData!: ChartConfiguration<'pie'>['data'];
    ngoDistributionData!: ChartConfiguration<'doughnut'>['data'];
    topDonorsData!: ChartConfiguration<'bar'>['data'];
  
    constructor(private foodService: AdmindashboardService) {}
  
    ngOnInit(): void {
      this.loadMonthlyDonations();
      this.loadStatusDistribution();
      this.loadNGODistribution();
      this.loadTopDonors();
    }
  
    loadMonthlyDonations() {
      this.foodService.getMonthlyDonations().subscribe(response => {
        console.log('Monthly Donations API response:', response);
        const labels = response.map((item: any) => item.month);
        const data = response.map((item: any) => {
          const val = Number(item.donations);  // use 'donations' here
          return isNaN(val) ? 0 : val;
        });
        console.log('Processed monthly labels:', labels);
        console.log('Processed monthly data:', data);
    
        this.monthlyDonationData = {
          labels,
          datasets: [{ label: 'Donations per Month', data, backgroundColor: 'skyblue' }]
        };
      });
    }
    
    
  
    loadStatusDistribution() {
      this.foodService.getStatusDistribution().subscribe(response => {
        console.log('Status Distribution response:', response);
    
        if (!response || response.length === 0) {
          // Handle empty or invalid response
          this.donationStatusData = {
            labels: [],
            datasets: [{ label: 'Status', data: [], backgroundColor: [] }]
          };
          return;
        }
    
        const labels = response.map((item: any) => item[0] || 'Unknown');
        const data = response.map((item: any) => item[1] || 0);        
    
        // Define a color array with enough colors or dynamically generate
        const backgroundColor = ['green', 'orange', 'red', 'blue', 'purple'];
    
        this.donationStatusData = {
          labels,
          datasets: [{
            label: 'Status',
            data,
            backgroundColor: backgroundColor.slice(0, labels.length)
          }]
        };
      });
    }
    
  
    loadNGODistribution() {
      this.foodService.getNGODistribution().subscribe(response => {
        console.log('NGO Distribution response:', response);
        const labels = response.map((item: any) => item.ngoName);
        const data = response.map((item: any) => item.foodDistributedKg);        
      
        this.ngoDistributionData = {
          labels,
          datasets: [{ label: 'NGO-wise', data, backgroundColor: ['blue', 'purple', 'gray'] }]
        };
      });
      
    }
  
    loadTopDonors() {
      this.foodService.getTopDonors().subscribe(response => {
        console.log('Top Donors API response:', response);
    
        const labels = response.map((item: any) => item.name || 'Unknown');
        const data = response.map((item: any) => {
          const val = Number(item.donationCount);  // use donationCount here
          return isNaN(val) ? 0 : val;
        });
    
        console.log('Processed labels:', labels);
        console.log('Processed data:', data);
    
        this.topDonorsData = {
          labels,
          datasets: [{ label: 'Top Donors', data, backgroundColor: 'teal' }]
        };
      });
    }
    
    
}
