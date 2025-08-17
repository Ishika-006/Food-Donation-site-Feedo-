import { TestBed } from '@angular/core/testing';

import { NgoDashboardService } from './ngo-dashboard.service';

describe('NgoDashboardService', () => {
  let service: NgoDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgoDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
