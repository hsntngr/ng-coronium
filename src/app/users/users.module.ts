import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from './routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './list/list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserEditComponent } from './edit/edit.component';
import { UserCreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    UsersListComponent, UserEditComponent, UserCreateComponent,
  ],
  imports: [
    UsersRoutingModule,
    NgxDatatableModule,
    SharedModule,
    CommonModule,
    CoreModule,
  ],
  bootstrap: [UsersComponent],
})
export class UsersModule {
}
