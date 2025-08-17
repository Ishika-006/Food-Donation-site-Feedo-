import { Component, OnInit } from '@angular/core';
import { ContributeService } from '../../service/contribute.service';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css']
})
export class ContributionComponent implements OnInit {
  totalDonations: number = 0;
  monthlyDonations: number = 0;
  peopleHelped: number = 0;
  foodSaved: number = 0;

  constructor(private donorService: ContributeService ) {}

  ngOnInit(): void {
    this.loadImpactData();
  }

  loadImpactData(): void {
    this.donorService.getTotalDonations().subscribe(data => {
      this.totalDonations = data;
    });

    this.donorService.getMonthlyDonations().subscribe(data => {
      this.monthlyDonations = data;
    });

    this.donorService.getPeopleHelped().subscribe(data => {
      this.peopleHelped = data;
    });

    this.donorService.getFoodSaved().subscribe(data => {
      this.foodSaved = data;
    });
  }
   
}
