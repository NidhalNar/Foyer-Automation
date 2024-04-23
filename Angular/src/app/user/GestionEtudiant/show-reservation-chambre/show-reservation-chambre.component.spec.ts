import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReservationChambreComponent } from './show-reservation-chambre.component';

describe('ShowReservationChambreComponent', () => {
  let component: ShowReservationChambreComponent;
  let fixture: ComponentFixture<ShowReservationChambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReservationChambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowReservationChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
