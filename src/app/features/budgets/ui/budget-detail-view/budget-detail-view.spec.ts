import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBudgetDetail } from '@budgets/models/monthly-budget-detail';

import { BudgetDetailView } from './budget-detail-view';

describe('BudgetDetailView', () => {
  let component: BudgetDetailView;
  let fixture: ComponentFixture<BudgetDetailView>;
  const mockBudget: MonthlyBudgetDetail = {
    id: '1',
    month: 10,
    year: 2026,
    expectedAmount: 500,
    actualAmount: 200,
    remainingAmount: 300,
    category: { id: '1', name: 'Comida', flowType: 'EXPENSE', deleted: false },
    createdAt: '2026-10-31',
    updatedAt: '2026-10-31',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetDetailView],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetDetailView);
    fixture.componentRef.setInput('budget', mockBudget);
    fixture.detectChanges();
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
