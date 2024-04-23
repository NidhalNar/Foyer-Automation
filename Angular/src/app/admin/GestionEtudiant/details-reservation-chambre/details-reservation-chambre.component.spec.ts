import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReservationChambreComponent } from './details-reservation-chambre.component';

describe('DetailsReservationChambreComponent', () => {
  let component: DetailsReservationChambreComponent;
  let fixture: ComponentFixture<DetailsReservationChambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsReservationChambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsReservationChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
