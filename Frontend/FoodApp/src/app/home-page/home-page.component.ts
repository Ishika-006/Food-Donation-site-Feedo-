import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  roles = [
    {
      title: 'Join as Donor',
      description: 'Share your surplus food and make a difference',
      icon: '🤝',
      iconColor: 'pink',
      route: 'donor-login'
    },
    {
      title: 'Join as Admin',
      description: 'Manage and coordinate food distribution',
      icon: '🛡️',
      iconColor: 'purple',
      route: 'admin-login'
    },
    {
      title: 'Join as NGO',
      description: 'Partner with us to reach more communities',
      icon: '🏢',
      iconColor: 'green',
      route: 'ngo-login'
    },
    {
      title: 'Join as Volunteer',
      description: 'Help deliver food to those in need',
      icon: '🚚',
      iconColor: 'red',
      route: 'delivery-login'
    }
  ];

  activeIndex = 0;
  private intervalId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startCardRotation();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private startCardRotation(): void {
    this.intervalId = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.roles.length;
    }, 3000); // Change card every 3 seconds
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  navigateToAbout(): void {
    this.router.navigate(['/about-us']);
  }

  navigateToContact(): void {
    this.router.navigate(['/contact-us']);
  }

  navigateToWork(): void {
    this.router.navigate(['/how-work']);
  }
}
