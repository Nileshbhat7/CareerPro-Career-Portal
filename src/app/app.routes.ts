import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'jobs',
    loadComponent: () => import('./features/jobs/jobs.component').then(m => m.JobsComponent),
  },
  {
    path: 'jobs/:id',
    loadComponent: () => import('./features/job-details/job-details.component').then(m => m.JobDetailsComponent),
  },
  {
    path: 'apply/:id',
    loadComponent: () => import('./features/apply/apply.component').then(m => m.ApplyComponent),
  },
  {
    path: 'thank-you',
    loadComponent: () => import('./features/thank-you/thank-you.component').then(m => m.ThankYouComponent),
  },
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
