import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  private baseUrl = 'http://localhost:8080/donor';

  constructor(private http: HttpClient) {}

  submitDonation(donation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/adddonate`, donation, {
      withCredentials: true,
      responseType: 'text'  // Ensures session cookies are sent and we receive plain text
    }).pipe(
      map(res => {
        // Try to parse JSON if possible, otherwise wrap in object
        try {
          return JSON.parse(res);
        } catch {
          return { message: res };
        }
      })
    );
  }  
}
