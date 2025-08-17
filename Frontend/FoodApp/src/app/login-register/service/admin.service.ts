import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/admin'; // Spring Boot backend URL

  constructor(private http: HttpClient) {}

  // Login donor using email and password as query params
  loginAdmin(email: string, password: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.post(`${this.baseUrl}/login`, null, { params, withCredentials: true });
  }

  // Register new donor with full object
  registerAdmin(donorData: any) {
    return this.http.post(`${this.baseUrl}/register`, donorData);
  }

      
  verifyEmail(email: string) {
    return this.http.get(`${this.baseUrl}/verify-email?email=${email}`);
  }
  
  updatePassword(email: string, newPassword: string) {
    return this.http.put(`${this.baseUrl}/update-password`, { email, newPassword });
  }
}
