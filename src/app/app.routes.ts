import { Routes } from '@angular/router';

import { authGuard } from '@core/auth/auth.guard';
import { guestGuard } from '@core/auth/guest.guard';

import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    canActivateChild: [guestGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: 'dashboard',
    component: MainLayout,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'categories',
        loadChildren: () => import('./features/categories/categories.routes').then((m) => m.routes),
      },
      {
        path: '**',
        redirectTo: 'categories',
      },
    ],
  },
];
