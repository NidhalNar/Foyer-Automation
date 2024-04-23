import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedChartsComponent } from './combined-charts.component';

describe('CombinedChartsComponent', () => {
  let component: CombinedChartsComponent;
  let fixture: ComponentFixture<CombinedChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinedChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
