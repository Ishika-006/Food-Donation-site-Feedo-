import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContributeService {

  private baseUrl = 'http://localhost:8080/donor';

  constructor(private http: HttpClient) {}

  getTotalDonations(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getMonthlyDonations(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/month`);
  }

  getPeopleHelped(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/people-helped`);
  }

  getFoodSaved(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/food-saved`);
  }
}
