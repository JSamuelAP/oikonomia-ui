import { TestBed } from '@angular/core/testing';

import { CategoryStore } from './category.store';

describe('CategoryStore', () => {
  let service: CategoryStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
