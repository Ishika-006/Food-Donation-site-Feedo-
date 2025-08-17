import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SellService } from '../../service/sell.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent {
  sellForm!: FormGroup;
  selectedImage: File | null = null;
  predictionResult: string | null = null;
  loadingPrediction = false;

  constructor(
    private fb: FormBuilder,
    private sellService: SellService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.sellForm = this.fb.group({
      name: [''],
      email: [''],
      phoneno: [''],
      food: [''],
      type: [''],
      category: [''],
      quantity: [''],
      price: [''],
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

    const apiUrl = `https://detect.roboflow.com/donate-jslwt/2?api_key=j0FrsE52GpFxipdX1Rmc`;

    this.http.post(apiUrl, formData).subscribe({
      next: (res: any) => {
        console.log("Prediction:", res);
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

  submitSell() {
    if (this.predictionResult?.toLowerCase() !== 'fresh') {
      alert('Your food is not fresh. You cannot sell this item.');
      return;
    }

    const formData = new FormData();
    Object.entries(this.sellForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.sellService.submitSell(formData).subscribe({
      next: (res) => {
        alert('Food item listed for sale successfully!');
        this.sellForm.reset();
        this.predictionResult = null;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          alert('You must be logged in to sell.');
        } else {
          alert('Something went wrong!');
        }
      }
    });
  }
}
