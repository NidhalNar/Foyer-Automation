import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBlocComponent } from './modifier-bloc.component';

describe('ModifierBlocComponent', () => {
  let component: ModifierBlocComponent;
  let fixture: ComponentFixture<ModifierBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierBlocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
