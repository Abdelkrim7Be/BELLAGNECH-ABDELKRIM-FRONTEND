import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full',
  },
  // Routes will be added for:
  // - clients (list, add, edit, details)
  // - credits (list, add, edit, details)
  // - remboursements (list, add, edit, details)
];
