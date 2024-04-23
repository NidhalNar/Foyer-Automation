import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletechambresComponent } from './deletechambres.component';

describe('DeletechambresComponent', () => {
  let component: DeletechambresComponent;
  let fixture: ComponentFixture<DeletechambresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletechambresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletechambresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
