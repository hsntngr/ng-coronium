import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: LoginComponent },
    ]),
    SharedModule,
    CoreModule,
  ],
})

export class LoginModule {
}
