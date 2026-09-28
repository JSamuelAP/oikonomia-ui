import { TestBed } from '@angular/core/testing';

import { CategoryCommandApiService } from './category-command-api.service';

describe('CategoryCommandApiService', () => {
  let service: CategoryCommandApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryCommandApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
