import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetBalanceSummary } from './budget-balance-summary';

describe('BudgetBalanceSummary', () => {
  let component: BudgetBalanceSummary;
  let fixture: ComponentFixture<BudgetBalanceSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetBalanceSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetBalanceSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
