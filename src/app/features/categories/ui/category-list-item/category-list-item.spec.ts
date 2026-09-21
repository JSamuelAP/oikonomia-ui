import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Category } from '@shared/category/models/category';

import { CategoryListItem } from './category-list-item';

describe('CategoryListItem', () => {
  let component: CategoryListItem;
  let fixture: ComponentFixture<CategoryListItem>;
  const mockCategory: Category = { id: '1', name: 'Comida', flowType: 'EXPENSE' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListItem);
    fixture.componentRef.setInput('category', mockCategory);
    fixture.detectChanges();
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
