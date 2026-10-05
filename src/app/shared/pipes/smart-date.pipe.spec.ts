import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SmartDatePipe } from './smart-date.pipe';

describe('SmartDatePipe', () => {
  let pipe: SmartDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartDatePipe, { provide: LOCALE_ID, useValue: 'es-ES' }],
    });
    pipe = TestBed.inject(SmartDatePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
