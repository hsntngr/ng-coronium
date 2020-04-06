import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin',
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'login',
        loadChildren: () => {
          return import('./login/login.module')
            .then(m => m.LoginModule);
        },
      },
      {
        path: 'dashboard',
        loadChildren: () => {
          return import('./dashboard/dashboard.module')
            .then(m => m.DashboardModule);
        },
      },
      {
        path: 'users',
        loadChildren: () => {
          return import('./users/users.module')
            .then(m => m.UsersModule);
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled',
  }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
