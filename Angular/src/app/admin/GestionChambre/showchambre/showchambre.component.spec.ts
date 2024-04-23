import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowchambreComponent } from './showchambre.component';

describe('ShowchambreComponent', () => {
  let component: ShowchambreComponent;
  let fixture: ComponentFixture<ShowchambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowchambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowchambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
