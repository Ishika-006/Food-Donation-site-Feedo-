import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FoodDonation {
  fid: number;
  food: string;
  type: string;
  category: string;
  quantity: string;
  date: string;
  address: string;
  location: string;
  phoneno: string;
  name: string;
}

export interface Feedback {
  id: number;
  name: string;
  message: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class DonordashboardService {

  private donationUrl = 'http://localhost:8080/donor';
  private feedbackUrl = 'http://localhost:8080/feedbacks';

  constructor(private http: HttpClient) {}

  getTotalDonations(): Observable<number> {
    return this.http.get<number>(`${this.donationUrl}/count`,{ withCredentials: true });
  }

  getPeopleHelped(): Observable<number> {
    return this.http.get<number>(`${this.donationUrl}/people-helped`,{ withCredentials: true });
  }

  getFoodSaved(): Observable<number> {
    return this.http.get<number>(`${this.donationUrl}/food-saved`,{ withCredentials: true });
  }

  getThisMonthDonations(): Observable<number> {
    return this.http.get<number>(`${this.donationUrl}/month`,{ withCredentials: true });
  }

  getRecentDonations(): Observable<FoodDonation[]> {
    return this.http.get<FoodDonation[]>(`${this.donationUrl}/recent`,{ withCredentials: true });
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.feedbackUrl}/all`,{ withCredentials: true });
  }

  getFeedbackCount(): Observable<number> {
    return this.http.get<number>(`${this.feedbackUrl}/count`,{ withCredentials: true });
  }
}
