import { Component, computed, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';
import { PIcon } from '@primeicons/angular/p-icon';
import { Tags } from '@primeicons/angular/tags';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';

import { Category } from '@shared/category/models/category';
import { FLOW_TYPE_DISPLAY, FlowType } from '@shared/models/flow-type';

let nextId = 0;

@Component({
  imports: [FormsModule, FloatLabel, PIcon, SelectModule, Tags],
  selector: 'app-category-select',
  templateUrl: './category-select.html',
})
export class CategorySelect implements FormValueControl<string> {
  readonly value = model('');
  readonly touched = model(false);
  readonly disabled = input(false);
  readonly invalid = input(false);

  readonly categories = input.required<Category[]>();
  readonly label = input('Categoría');

  protected readonly inputId = `category-select-${nextId++}`;

  protected readonly groups = computed<SelectItemGroup[]>(() =>
    (['EXPENSE', 'INCOME'] as const).map((flow) => ({
      label: FLOW_TYPE_DISPLAY[flow].title,
      items: this.toSelectItems(this.categories(), flow),
    })),
  );

  private toSelectItems(categories: Category[], flowType: FlowType): SelectItem<string>[] {
    return categories.filter((c) => c.flowType === flowType).map((c) => this.toSelectItem(c));
  }

  private toSelectItem(category: Category): SelectItem<string> {
    return {
      label: category.name,
      value: category.id,
      icon: FLOW_TYPE_DISPLAY[category.flowType].icon,
      styleClass: category.flowType === 'INCOME' ? 'p-green-700' : 'p-red-700',
    };
  }
}
