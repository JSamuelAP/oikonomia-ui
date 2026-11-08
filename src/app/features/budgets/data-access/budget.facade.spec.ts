import { TestBed } from '@angular/core/testing';

import { BudgetFacade } from './budget.facade';

describe('BudgetFacade', () => {
  let service: BudgetFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
