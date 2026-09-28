import { TestBed } from '@angular/core/testing';

import { CategoryFacade } from './category.facade';

describe('CategoryFacade', () => {
  let service: CategoryFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
