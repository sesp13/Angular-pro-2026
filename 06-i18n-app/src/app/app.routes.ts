import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./pages/products-page/products-page'),
  },
  {
    path: 'basic-plan',
    loadComponent: () => import('./pages/basic-plan-page/basic-plan-page'),
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
