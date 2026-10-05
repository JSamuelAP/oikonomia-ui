import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetail } from '@shared/category/models/category-detail';

import { CategoryDetailView } from './category-detail-view';

describe('CategoryDetailView', () => {
  let component: CategoryDetailView;
  let fixture: ComponentFixture<CategoryDetailView>;
  const mockCategory: CategoryDetail = {
    id: '1',
    name: 'Comida',
    flowType: 'EXPENSE',
    createdAt: '2026-10-05',
    updatedAt: '2026-10-05',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDetailView],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDetailView);
    fixture.componentRef.setInput('category', mockCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
