import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm: FormGroup;
  roles: string[] = ['Donor', 'NGO', 'Volunteer', 'Delivery Partner', 'Other'];

  constructor(private fb: FormBuilder,private router: Router) {
    this.contactForm = this.fb.group({
      role: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: [''],
      message: ['']
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
      alert('Message sent successfully!');
      this.contactForm.reset();
    } else {
      alert('Please fill out all required fields.');
    }
  }
  navigateToHome(): void {
    this.router.navigate(['/home']); // Navigate to donation form
  }
  navigateToAbout(): void {
    this.router.navigate(['/about-us']); // Navigate to donation form
  }
  navigateToWork(): void {
    this.router.navigate(['/how-work']); // Navigate to donation form
  }
}
