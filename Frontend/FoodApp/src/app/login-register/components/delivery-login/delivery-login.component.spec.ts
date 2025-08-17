import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLoginComponent } from './delivery-login.component';

describe('DeliveryLoginComponent', () => {
  let component: DeliveryLoginComponent;
  let fixture: ComponentFixture<DeliveryLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryLoginComponent]
    });
    fixture = TestBed.createComponent(DeliveryLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
