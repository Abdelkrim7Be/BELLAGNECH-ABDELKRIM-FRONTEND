import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full',
  },
  // Client routes
  {
    path: 'clients',
    loadComponent: () =>
      import('./pages/client/client-list/client-list.component').then(
        (m) => m.ClientListComponent
      ),
  },
  {
    path: 'clients/add',
    loadComponent: () =>
      import('./pages/client/client-form/client-form.component').then(
        (m) => m.ClientFormComponent
      ),
  },
  {
    path: 'clients/:id',
    loadComponent: () =>
      import('./pages/client/client-detail/client-detail.component').then(
        (m) => m.ClientDetailComponent
      ),
  },
  {
    path: 'clients/:id/edit',
    loadComponent: () =>
      import('./pages/client/client-form/client-form.component').then(
        (m) => m.ClientFormComponent
      ),
  },
  {
    path: 'clients/:clientId/credits',
    loadComponent: () =>
      import('./pages/credit/credit-list/credit-list.component').then(
        (m) => m.CreditListComponent
      ),
  },
  {
    path: 'clients/:clientId/credits/add',
    loadComponent: () =>
      import('./pages/credit/credit-form/credit-form.component').then(
        (m) => m.CreditFormComponent
      ),
  },

  // Credit routes
  {
    path: 'credits',
    loadComponent: () =>
      import('./pages/credit/credit-list/credit-list.component').then(
        (m) => m.CreditListComponent
      ),
  },
  {
    path: 'credits/add',
    loadComponent: () =>
      import('./pages/credit/credit-form/credit-form.component').then(
        (m) => m.CreditFormComponent
      ),
  },
  {
    path: 'credits/:id',
    loadComponent: () =>
      import('./pages/credit/credit-list/credit-list.component').then(
        (m) => m.CreditListComponent
      ),
  },
  {
    path: 'credits/:id/edit',
    loadComponent: () =>
      import('./pages/credit/credit-form/credit-form.component').then(
        (m) => m.CreditFormComponent
      ),
  },
  {
    path: 'credits/:creditId/remboursements',
    loadComponent: () =>
      import(
        './pages/remboursement/remboursement-list/remboursement-list.component'
      ).then((m) => m.RemboursementListComponent),
  },
  {
    path: 'credits/:creditId/remboursements/add',
    loadComponent: () =>
      import(
        './pages/remboursement/remboursement-form/remboursement-form.component'
      ).then((m) => m.RemboursementFormComponent),
  },

  // Remboursement routes
  {
    path: 'remboursements',
    loadComponent: () =>
      import(
        './pages/remboursement/remboursement-list/remboursement-list.component'
      ).then((m) => m.RemboursementListComponent),
  },
  {
    path: 'remboursements/add',
    loadComponent: () =>
      import(
        './pages/remboursement/remboursement-form/remboursement-form.component'
      ).then((m) => m.RemboursementFormComponent),
  },
  {
    path: 'remboursements/:id/edit',
    loadComponent: () =>
      import(
        './pages/remboursement/remboursement-form/remboursement-form.component'
      ).then((m) => m.RemboursementFormComponent),
  },

  // Wildcard route
  {
    path: '**',
    redirectTo: 'clients',
  },
];
