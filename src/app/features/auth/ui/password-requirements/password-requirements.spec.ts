import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRequirements } from './password-requirements';

describe('PasswordRequirements', () => {
  let component: PasswordRequirements;
  let fixture: ComponentFixture<PasswordRequirements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordRequirements],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordRequirements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
