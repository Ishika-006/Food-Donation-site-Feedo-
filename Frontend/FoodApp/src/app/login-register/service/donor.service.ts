import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private baseUrl = 'http://localhost:8080/donor'; // Spring Boot backend URL

  constructor(private http: HttpClient) {}

  // Login donor using email and password as query params
  loginDonor(email: string, password: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.post(`${this.baseUrl}/login`, null, { params, withCredentials: true });
  }

  // Register new donor with full object
  registerDonor(donorData: any) {
    return this.http.post(`${this.baseUrl}/register`, donorData);
  }

  
  verifyEmail(email: string) {
    return this.http.get(`${this.baseUrl}/verify-email?email=${email}`);
  }
  
  updatePassword(email: string, newPassword: string) {
    return this.http.put(`${this.baseUrl}/update-password`, { email, newPassword });
  }
}
