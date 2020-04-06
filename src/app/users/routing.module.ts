import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './edit/edit.component';
import { UserCreateComponent } from './create/create.component';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './list/list.component';
import { UserResolver } from '@core/resolvers/user.resolver';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: UsersComponent, canActivate: [AuthGuard], children: [
      { path: '', pathMatch: 'full', component: UsersListComponent },
      { path: 'edit/:id', component: UserEditComponent, resolve: { user: UserResolver } },
      { path: 'create', component: UserCreateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
