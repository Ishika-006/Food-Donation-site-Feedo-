import { Component } from '@angular/core';
import { DeliveryService } from '../../service/delivery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-login',
  templateUrl: './delivery-login.component.html',
  styleUrls: ['./delivery-login.component.css']
})
export class DeliveryLoginComponent {
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
    email: '',
    password: '',
    city: '',
    role: 'DELIVERY'
  };

  forgotEmail = '';
  newPassword = '';

  constructor(private deliveryService: DeliveryService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  showForgotPassword() {
    this.isForgotPasswordMode = true;
    this.errorMessage = '';
    this.emailVerified = false;
    this.forgotEmail = '';
    this.newPassword = '';
  }

  cancelForgotPassword() {
    this.isForgotPasswordMode = false;
    this.errorMessage = '';
    this.emailVerified = false;
    this.forgotEmail = '';
    this.newPassword = '';
  }

  onSubmit() {
    if (this.isForgotPasswordMode) return; // Do nothing, separate handler

    if (this.isLoginMode) {
      this.deliveryService.loginDeliveryPerson(this.loginData.email, this.loginData.password).subscribe({
        next: () => {
          alert('Login successful');
          this.router.navigate(['/delivery-dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || err.error || 'Login failed';
        }
      });
    } else {
      this.deliveryService.registerDeliveryPerson(this.registerData).subscribe({
        next: () => {
          alert('Registration successful');
          this.toggleMode(); // switch to login mode
        },
        error: () => {
          this.errorMessage = 'Registration failed';
        }
      });
    }
  }

  handleForgotPassword() {
    if (!this.emailVerified) {
      // Verify if email exists
      this.deliveryService.verifyEmail(this.forgotEmail).subscribe({
        next: () => {
          this.emailVerified = true;
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Email not found';
        }
      });
    } else {
      // Update password
      this.deliveryService.updatePassword(this.forgotEmail, this.newPassword).subscribe({
        next: () => {
          alert('Password updated successfully');
          this.cancelForgotPassword();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Password update failed';
        }
      });
    }
  }
}
