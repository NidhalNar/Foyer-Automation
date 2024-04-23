import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsChambreUserComponent } from './details-chambre-user.component';

describe('DetailsChambreUserComponent', () => {
  let component: DetailsChambreUserComponent;
  let fixture: ComponentFixture<DetailsChambreUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsChambreUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsChambreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
