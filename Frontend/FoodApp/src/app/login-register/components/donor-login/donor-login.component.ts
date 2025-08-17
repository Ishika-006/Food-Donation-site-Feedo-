import { Component } from '@angular/core';
import { DonorService } from '../../service/donor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor-login',
  templateUrl: './donor-login.component.html',
  styleUrls: ['./donor-login.component.css']
})
export class DonorLoginComponent {
  isLoginMode = true; // toggle between login/register
  errorMessage = '';

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    donorType: 'Individual',
    role: 'DONOR'
  };

  constructor(private donorService: DonorService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.donorService.loginDonor(this.loginData.email, this.loginData.password).subscribe({
        next: () => {
          alert('Login successful');
          console.log('Login Email:', this.loginData.email);
          console.log('Login Password:', this.loginData.password);
          this.router.navigate(['/donor-dashboard']);
        },
        error: (err) => {
          console.log(err);  // for debugging
          if (err.error && typeof err.error === 'object') {
            this.errorMessage = err.error.message || 'Login failed';
          } else {
            this.errorMessage = err.error || 'Login failed';
          }
        }
      });
    } else {
      this.donorService.registerDonor(this.registerData).subscribe({
        next: () => {
          alert('Registration successful');
          this.toggleMode(); // switch to login
        },
        error: () => {
          this.errorMessage = 'Registration failed';
        }
      });
    }
  }

  isForgotPasswordMode = false;
emailVerified = false;
forgotEmail = '';
newPassword = '';

showForgotPassword() {
  this.isLoginMode = false;
  this.isForgotPasswordMode = true;
  this.errorMessage = '';
}
cancelForgotPassword() {
  this.isForgotPasswordMode = false;
  this.emailVerified = false;
  this.forgotEmail = '';
  this.newPassword = '';
  this.errorMessage = '';
}


handleForgotPassword() {
  if (!this.emailVerified) {
    // Step 1: Email verify
    this.donorService.verifyEmail(this.forgotEmail).subscribe({
      next: (res) => {
        alert('Email verified, please set your new password.');
        this.emailVerified = true;
      },
      error: () => {
        this.errorMessage = 'Email not found';
      }
    });
  } else {
    // Step 2: Update password
    this.donorService.updatePassword(this.forgotEmail, this.newPassword).subscribe({
      next: () => {
        alert('Password updated successfully. Please login.');
        this.isForgotPasswordMode = false;
        this.isLoginMode = true;
      },
      error: () => {
        this.errorMessage = 'Failed to update password';
      }
    });
  }
}

}
