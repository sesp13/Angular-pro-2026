import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/admin/layouts/admin-layout/admin-layout'),
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/admin/pages/summary-page/summary-page'),
      },
      {
        path: 'projects',
        loadComponent: () => import('./modules/admin/pages/projects-page/projects-page'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
