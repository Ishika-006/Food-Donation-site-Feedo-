import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWorkComponent } from './how-work.component';

describe('HowWorkComponent', () => {
  let component: HowWorkComponent;
  let fixture: ComponentFixture<HowWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HowWorkComponent]
    });
    fixture = TestBed.createComponent(HowWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
