import { inject, Service } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { CategoryApiService } from './category-api.service';

@Service()
export class CategoryStore {
  private readonly categoryApi = inject(CategoryApiService);

  readonly categories = rxResource({
    stream: () => this.categoryApi.getAll(),
    defaultValue: [],
  });
}
