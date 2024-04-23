import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationChartComponent } from './evaluation-chart.component';

describe('EvaluationChartComponent', () => {
  let component: EvaluationChartComponent;
  let fixture: ComponentFixture<EvaluationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
