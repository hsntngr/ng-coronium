import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { UsersComponent } from './users/users.component';
import { AuthService } from '@core/services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrettyValidationsInterceptor } from '@core/interceptors/pretty-validations.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppendJwtTokenInterceptor } from '@core/interceptors/append-jwt-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DashboardComponent,
  ],
  imports: [
    SharedModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (s: AuthService) => () => s.initiate(),
      deps: [AuthService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PrettyValidationsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppendJwtTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
