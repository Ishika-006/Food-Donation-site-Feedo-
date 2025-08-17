import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
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
    location: '',
    address: '',
    role: 'ADMIN'
  };

  forgotEmail = '';
  newPassword = '';

  constructor(private adminService: AdminService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.isForgotPasswordMode = false;
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

  onSubmit() {
    if (this.isLoginMode) {
      this.adminService.loginAdmin(this.loginData.email, this.loginData.password).subscribe({
        next: () => {
          alert('Login successful');
          this.router.navigate(['/admin-dashboard']);
        },
        error: (err) => {
          console.log(err);
          if (err.error && typeof err.error === 'object') {
            this.errorMessage = err.error.message || 'Login failed';
          } else {
            this.errorMessage = err.error || 'Login failed';
          }
        }
      });
    } else {
      this.adminService.registerAdmin(this.registerData).subscribe({
        next: (res: any) => {
          alert(res.message || 'Registration successful');
          this.toggleMode();
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
      this.adminService.verifyEmail(this.forgotEmail).subscribe({
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
      this.adminService.updatePassword(this.forgotEmail, this.newPassword).subscribe({
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
