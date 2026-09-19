import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/categories/categories').then((m) => m.Categories),
  },
];
