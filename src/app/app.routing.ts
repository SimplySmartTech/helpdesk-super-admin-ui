import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './modules/auth/auth-layout/auth-layout.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'admin/home',
    pathMatch: 'full',
  }, 
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
  },
  
 {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  },
  
  // {
  //   path: '', redirectTo: '/auth/login', pathMatch: "full"
  // },
  // {
  //   path: '*', redirectTo: '/auth/login'
  // },
  // {path: '**', redirectTo: '/auth/login'}
]
