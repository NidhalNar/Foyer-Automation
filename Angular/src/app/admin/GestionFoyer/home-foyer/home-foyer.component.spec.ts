import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFoyerComponent } from './home-foyer.component';

describe('HomeFoyerComponent', () => {
  let component: HomeFoyerComponent;
  let fixture: ComponentFixture<HomeFoyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFoyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
