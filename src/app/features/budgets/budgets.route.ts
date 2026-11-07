import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/budgets/budgets').then((m) => m.Budgets),
  },
];
