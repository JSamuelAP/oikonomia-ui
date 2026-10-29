import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SignedCurrencyPipe } from './signed-currency.pipe';

describe('SignedCurrencyPipe', () => {
  let pipe: SignedCurrencyPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignedCurrencyPipe, { provide: LOCALE_ID, usesValue: 'es-ES' }],
    });
    pipe = TestBed.inject(SignedCurrencyPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
