import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { Budgets } from './budgets';

describe('Budgets', () => {
  let component: Budgets;
  let fixture: ComponentFixture<Budgets>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Budgets],
      providers: [provideHttpClient(), provideHttpClientTesting(), MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(Budgets);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    const balance = {
      month: '',
      income: { expected: 0, actual: 0, remaining: 0 },
      expense: { expected: 0, actual: 0, remaining: 0 },
      expectedBalance: 0,
      actualBalance: 0,
    };

    httpMock.match((req) => req.url.endsWith('/balance')).forEach((req) => req.flush(balance));
    httpMock.match((req) => !req.url.endsWith('/balance')).forEach((req) => req.flush([]));

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
