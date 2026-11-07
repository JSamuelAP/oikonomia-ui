import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetProgress } from './budget-progress';

describe('BudgetProgress', () => {
  let component: BudgetProgress;
  let fixture: ComponentFixture<BudgetProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetProgress);
    fixture.componentRef.setInput('flow', 'INCOME');
    fixture.componentRef.setInput('expected', 0);
    fixture.componentRef.setInput('actual', 0);
    fixture.componentRef.setInput('remaining', 0);
    fixture.detectChanges();
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
