import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDates } from './audit-dates';

describe('AuditDates', () => {
  let component: AuditDates;
  let fixture: ComponentFixture<AuditDates>;
  const mockDate = new Date();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditDates],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditDates);
    fixture.componentRef.setInput('createdAt', mockDate);
    fixture.componentRef.setInput('updatedAt', mockDate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
