import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordBlocComponent } from './dashbord-bloc.component';

describe('DashbordBlocComponent', () => {
  let component: DashbordBlocComponent;
  let fixture: ComponentFixture<DashbordBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordBlocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
