import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoLoginComponent } from './ngo-login.component';

describe('NgoLoginComponent', () => {
  let component: NgoLoginComponent;
  let fixture: ComponentFixture<NgoLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgoLoginComponent]
    });
    fixture = TestBed.createComponent(NgoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
