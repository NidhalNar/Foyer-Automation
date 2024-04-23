import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChambresComponent } from './add-chambres.component';

describe('AddChambresComponent', () => {
  let component: AddChambresComponent;
  let fixture: ComponentFixture<AddChambresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChambresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChambresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
