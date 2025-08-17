import { TestBed } from '@angular/core/testing';

import { DonordashboardService } from './donordashboard.service';

describe('DonordashboardService', () => {
  let service: DonordashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonordashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
