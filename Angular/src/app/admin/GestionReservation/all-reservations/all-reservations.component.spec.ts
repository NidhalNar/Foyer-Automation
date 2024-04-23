import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReservationsComponent } from './all-reservations.component';

describe('AllReservationsComponent', () => {
  let component: AllReservationsComponent;
  let fixture: ComponentFixture<AllReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
