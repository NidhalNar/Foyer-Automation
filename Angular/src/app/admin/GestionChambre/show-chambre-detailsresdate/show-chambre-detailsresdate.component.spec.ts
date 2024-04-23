import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowChambreDetailsresdateComponent } from './show-chambre-detailsresdate.component';

describe('ShowChambreDetailsresdateComponent', () => {
  let component: ShowChambreDetailsresdateComponent;
  let fixture: ComponentFixture<ShowChambreDetailsresdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowChambreDetailsresdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowChambreDetailsresdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
