import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueChambreComponent } from './statistique-chambre.component';

describe('StatistiqueChambreComponent', () => {
  let component: StatistiqueChambreComponent;
  let fixture: ComponentFixture<StatistiqueChambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiqueChambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
