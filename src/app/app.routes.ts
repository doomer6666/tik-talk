import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { SearchPage } from './pages/search-page/search-page';
import { Layout } from './common-ui/layout/layout';
import { canActivateAuth } from './data/services/auth/access.guard';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  {
    path: '',
    component: Layout,
    children: [{ path: 'search', component: SearchPage }],
    canActivate: [canActivateAuth],
  },
];
