import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReservationsEtudiantComponent } from './all-reservations-etudiant.component';

describe('AllReservationsEtudiantComponent', () => {
  let component: AllReservationsEtudiantComponent;
  let fixture: ComponentFixture<AllReservationsEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReservationsEtudiantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllReservationsEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
