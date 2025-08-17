import { Component } from '@angular/core';
import { NGOService } from '../../service/ngo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngo-login',
  templateUrl: './ngo-login.component.html',
  styleUrls: ['./ngo-login.component.css']
})
export class NgoLoginComponent {
  isLoginMode = true;
  isForgotPasswordMode = false;
  emailVerified = false;

  errorMessage = '';

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    name: '',
    registrationNumber: '',
    email: '',
    password: '',
    contactNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    website: '',
    typeOfWork: '',
    founderName: '',
    yearOfEstablishment: 0,
    isActive: true,
    role: 'NGO'
  };

  forgotEmail = '';
  newPassword = '';

  constructor(private ngoService: NGOService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  showForgotPassword() {
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
      this.ngoService.verifyEmail(this.forgotEmail).subscribe({
        next: () => {
          alert('Email verified. You can now set a new password.');
          this.emailVerified = true;
        },
        error: () => {
          this.errorMessage = 'Email not found';
        }
      });
    } else {
      this.ngoService.updatePassword(this.forgotEmail, this.newPassword).subscribe({
        next: () => {
          alert('Password updated successfully. Please login.');
          this.cancelForgotPassword();
          this.isLoginMode = true;
        },
        error: () => {
          this.errorMessage = 'Failed to update password';
        }
      });
    }
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.ngoService.loginNGO(this.loginData.email, this.loginData.password).subscribe({
        next: () => {
          alert('Login successful');
          this.router.navigate(['/ngo-dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.error?.message || 'Login failed';
        }
      });
    } else {
      this.ngoService.registerNGO(this.registerData).subscribe({
        next: () => {
          alert('Registration successful');
          this.toggleMode();
        },
        error: () => {
          this.errorMessage = 'Registration failed';
        }
      });
    }
  }
}
