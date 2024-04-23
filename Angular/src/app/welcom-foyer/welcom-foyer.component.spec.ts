import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomFoyerComponent } from './welcom-foyer.component';

describe('WelcomFoyerComponent', () => {
  let component: WelcomFoyerComponent;
  let fixture: ComponentFixture<WelcomFoyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomFoyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomFoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
