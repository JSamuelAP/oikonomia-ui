import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';

import { FieldErrors } from './field-errors';

describe('FieldErrors', () => {
  let component: FieldErrors<{ a: string }>;
  let fixture: ComponentFixture<FieldErrors<{ a: string }>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldErrors],
    }).compileComponents();

    let testForm: ReturnType<typeof form<{ a: string }>>;
    TestBed.runInInjectionContext(() => {
      testForm = form(signal({ a: '' }));
    });

    fixture = TestBed.createComponent(FieldErrors<{ a: string }>);
    fixture.componentRef.setInput('field', testForm!.a);
    fixture.detectChanges();
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
