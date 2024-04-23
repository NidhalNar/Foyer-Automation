import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBlocComponent } from './show-bloc.component';

describe('ShowBlocComponent', () => {
  let component: ShowBlocComponent;
  let fixture: ComponentFixture<ShowBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBlocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
