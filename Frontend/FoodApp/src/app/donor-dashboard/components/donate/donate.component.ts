// donate.component.ts
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DonateService } from '../../service/donate.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent {
  donationForm!: FormGroup;
  selectedImage: File | null = null;
  predictionResult: string | null = null; // ✅ To store stale/fresh result
  loadingPrediction = false;

  constructor(
    private fb: FormBuilder,
    private donationService: DonateService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.donationForm = this.fb.group({
      name: [''],
      email: [''],
      phoneno: [''],
      food: [''],
      type: [''],
      category: [''],
      quantity: [''],
      address: [''],
      location: [''],
      date: [new Date().toISOString()] 
    });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      this.getPrediction(this.selectedImage);
    }
  }

  getPrediction(file: File) {
    this.loadingPrediction = true;
    this.predictionResult = null;

    const formData = new FormData();
    formData.append("file", file);

    // ✅ Replace URL with your actual model endpoint
    const apiUrl = `https://detect.roboflow.com/donate-jslwt/2?api_key=j0FrsE52GpFxipdX1Rmc`;

    this.http.post(apiUrl, formData).subscribe({
      next: (res: any) => {
        console.log("Prediction:", res);
        // Adjust based on your API’s response format
        this.predictionResult = res.predictions?.[0]?.class || 'Unknown';
        this.loadingPrediction = false;
      },
      error: (err) => {
        console.error("Prediction error", err);
        this.predictionResult = "Error getting prediction";
        this.loadingPrediction = false;
      }
    });
  }

  submitDonation() {
    if (this.predictionResult?.toLowerCase() !== 'fresh') {
      alert('Your food is not fresh. Donation cannot be accepted.');
      return;
    }
  
    const formData = new FormData();
    Object.entries(this.donationForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
  
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
  
    this.donationService.submitDonation(formData).subscribe({
      next: () => {
        alert('Thanks for donating!');
        this.donationForm.reset();
        this.predictionResult = null;
      },
      error: (err) => {
        alert('Something went wrong!');
      }
    });
  }  
}
