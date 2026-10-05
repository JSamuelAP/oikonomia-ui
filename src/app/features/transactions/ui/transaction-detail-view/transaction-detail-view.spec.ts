import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetail } from '@transactions/models/transaction-detail';

import { TransactionDetailView } from './transaction-detail-view';

describe('TransactionDetailView', () => {
  let component: TransactionDetailView;
  let fixture: ComponentFixture<TransactionDetailView>;
  const mockTransaction: TransactionDetail = {
    id: '1',
    date: '2026-10-05',
    amount: 100,
    notes: '',
    category: { id: '1', name: 'Comida', flowType: 'EXPENSE', deleted: false },
    createdAt: '2026-10-05',
    updatedAt: '2026-10-05',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDetailView],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionDetailView);
    fixture.componentRef.setInput('transaction', mockTransaction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
