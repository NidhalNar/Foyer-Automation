import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordChambreComponent } from './dashbord-chambre.component';

describe('DashbordChambreComponent', () => {
  let component: DashbordChambreComponent;
  let fixture: ComponentFixture<DashbordChambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordChambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
