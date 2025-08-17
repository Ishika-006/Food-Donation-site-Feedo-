import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService, UserFeedback } from './feedback.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm!: FormGroup;
  stars = [1, 2, 3, 4, 5];
  hoveredStar = 0;
  loading = false;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      userType: ['', Validators.required],
      overallExperience: [0, [Validators.required, Validators.min(1)]],
      aiFreshness: ['', Validators.required],
      detailedFeedback: [''],
      suggestions: ['']
    });
  }

  setRating(rating: number): void {
    this.feedbackForm.get('overallExperience')?.setValue(rating);
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) {
      this.markAllTouched();
      return;
    }

    this.loading = true;

    const feedback: UserFeedback = this.feedbackForm.value;

    this.feedbackService.submitFeedback(feedback).subscribe({
      next: () => {
        alert('Thank you for your feedback!');
        this.feedbackForm.reset();
        this.hoveredStar = 0;
        this.loading = false;
      },
      error: () => {
        alert('Something went wrong. Please try again.');
        this.loading = false;
      }
    });
  }

  private markAllTouched(): void {
    Object.values(this.feedbackForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
