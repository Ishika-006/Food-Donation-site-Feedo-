import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-work',
  templateUrl: './how-work.component.html',
  styleUrls: ['./how-work.component.css']
})
export class HowWorkComponent implements OnInit {
  constructor(private router: Router ) {}
  steps = [
    {
      title: 'Food Donation',
      description: 'Donors contribute fresh surplus food through our platform'
    },
    {
      title: 'AI Quality Verification',
      description: 'Advanced ML models verify food freshness and safety'
    },
    {
      title: 'Smart Delivery',
      description: 'Trained delivery partners collect and transport food safely'
    },
    {
      title: 'Community Impact',
      description: 'NGOs receive fresh food and serve their communities'
    }
  ];

  technologies = [
    {
      title: 'Artificial Intelligence',
      description: 'Advanced computer vision and deep learning models accurately detect food quality, freshness levels, and safety standards with 99% accuracy.'
    },
    {
      title: 'Real-time Tracking',
      description: 'GPS tracking and live updates provide complete visibility throughout the delivery process, ensuring donors and NGOs stay informed.'
    },
    {
      title: 'Smart Platform',
      description: 'User-friendly mobile and web platform makes managing the entire donation-to-delivery process simple and efficient for all users.'
    }
  ];

  currentStepIndex = 0;

  ngOnInit(): void {
    this.autoHighlightSteps();
  }

  autoHighlightSteps(): void {
    setInterval(() => {
      this.currentStepIndex = (this.currentStepIndex + 1) % this.steps.length;
    }, 4000); // 4 seconds
  } 
  navigateToHome(): void {
    this.router.navigate(['/home']); // Navigate to donation form
  }
  navigateToAbout(): void {
    this.router.navigate(['/about-us']); // Navigate to donation form
  }
  navigateToContact(): void {
    this.router.navigate(['/contact-us']); // Navigate to donation form
  }
}
