import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowChambreUserComponent } from './show-chambre-user.component';

describe('ShowChambreUserComponent', () => {
  let component: ShowChambreUserComponent;
  let fixture: ComponentFixture<ShowChambreUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowChambreUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowChambreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
