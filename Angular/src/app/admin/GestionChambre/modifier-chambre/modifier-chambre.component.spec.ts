import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierChambreComponent } from './modifier-chambre.component';

describe('ModifierChambreComponent', () => {
  let component: ModifierChambreComponent;
  let fixture: ComponentFixture<ModifierChambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierChambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
