import { I18nPluralPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TagModule } from 'primeng/tag';

import { Category } from '@shared/category/models/category';
import { FLOW_TYPE_DISPLAY, FlowType } from '@shared/models/flow-type';

import { CategoryListItem } from '../category-list-item/category-list-item';

@Component({
  imports: [CategoryListItem, I18nPluralPipe, TagModule],
  selector: 'app-category-list',
  templateUrl: './category-list.html',
})
export class CategoryList {
  readonly categories = input<Category[]>([]);
  readonly flowType = input.required<FlowType>();

  protected readonly display = computed(() => FLOW_TYPE_DISPLAY[this.flowType()]);
  protected readonly tagMap = {
    '=0': 'Sin categorías',
    '=1': '# categoría',
    other: '# categorías',
  };
}
