import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailschambreadminComponent } from './detailschambreadmin.component';

describe('DetailschambreadminComponent', () => {
  let component: DetailschambreadminComponent;
  let fixture: ComponentFixture<DetailschambreadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailschambreadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailschambreadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
