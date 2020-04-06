import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';

export class PrettyValidationsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((response: any) => {
        if (response instanceof HttpErrorResponse && response.status === AuthService.VALIDATION_FAILED) {
          const errorGroups: string[][] = Object.values(response.error.errors);
          const errors = [];
          for (const error of errorGroups) {
            error.forEach(e => errors.push(e));
          }
          return throwError({ status: response.status, error: errors });
        }
        return throwError(response);
      }));
  }

}
