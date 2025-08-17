import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  constructor(private router: Router ) {}
  navigateToHome(): void {
    this.router.navigate(['/home']); // Navigate to donation form
  }
  navigateToContact(): void {
    this.router.navigate(['/contact-us']); // Navigate to donation form
  }
  navigateToWork(): void {
    this.router.navigate(['/how-work']); // Navigate to donation form
  }
}
